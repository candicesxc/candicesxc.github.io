import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let progress = 0
const listeners = new Set()

// Page scroll progress (0..1), pushed to subscribers without re-rendering React.
export function onProgress(fn) {
  listeners.add(fn)
  fn(progress)
  return () => listeners.delete(fn)
}

// Scrolling itself is native: each section is one screen tall and the page
// snaps between them with CSS scroll-snap (see index.css).
export function initScroll() {
  const st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      progress = self.progress
      listeners.forEach((fn) => fn(progress))
    },
  })
  const stopPaging = initPaging()
  return () => {
    st.kill()
    stopPaging()
  }
}

// Glides to a chapter and reports when it has landed. Everything that moves the page goes
// through here, so a wheel turn can never start on top of a scroll already under way.
let gliding = false
let finishGlide = null

function glide(el, block = 'start') {
  finishGlide?.()
  gliding = true
  const finish = () => {
    gliding = false
    finishGlide = null
    clearTimeout(cap)
    window.removeEventListener('scrollend', finish)
  }
  // `scrollend` is the real signal; the timer covers browsers without it.
  const cap = setTimeout(finish, 1100)
  finishGlide = finish
  window.addEventListener('scrollend', finish)
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block })
}

// One gesture, one page: a swipe, a turn of the wheel, a trackpad flick or the arrow/page/space
// keys move one chapter, however small the gesture was. A chapter taller than the window
// scrolls normally until its edge, then turns. Sideways swipes (photo strips, the map) and
// open pop-ups are left alone.
const PAGED = '(min-width: 768px)'

function initPaging() {
  const screens = () => [...document.querySelectorAll('.screen')]
  // The chapter under the middle of the window.
  const currentIndex = (list) => {
    const mid = window.innerHeight / 2
    const i = list.findIndex((el) => {
      const r = el.getBoundingClientRect()
      return r.top <= mid && r.bottom > mid
    })
    return Math.max(0, i)
  }
  const popupOpen = () => document.querySelector('[aria-modal="true"]')
  const skip = (e) => e.altKey || e.ctrlKey || e.metaKey || popupOpen() || !window.matchMedia(PAGED).matches
  const tooTall = (el) => el.offsetHeight > window.innerHeight + 2
  // True while a tall chapter still has its own content to scroll through in that direction.
  const insideTall = (el, dir) => {
    if (!tooTall(el)) return false
    const r = el.getBoundingClientRect()
    return dir > 0 ? r.bottom > window.innerHeight + 2 : r.top < -2
  }

  const turn = (dir) => {
    const list = screens()
    const from = currentIndex(list)
    const target = list[Math.min(list.length - 1, Math.max(0, from + dir))]
    if (target === list[from]) return
    // Coming back up into a tall chapter lands on its end, where the visitor left it.
    glide(target, dir < 0 && tooTall(target) ? 'end' : 'start')
  }

  // Wheel and trackpad. A trackpad flick swells while the finger moves, then sends fading
  // "momentum" events for two seconds or more, so one gesture must only ever turn one page.
  // Nothing during a glide counts for anything. After landing, a new gesture shows itself in
  // one of two ways: the events stop for a moment, or a faded tail suddenly surges again.
  // A pause followed by a slightly smaller event is only the browser stalling mid-fade.
  const NEW_GESTURE_GAP = 250
  let armed = true
  let leftover = false // Still feeling the gesture that made the last turn
  let lastWheel = 0
  let lastSize = 0
  let tail = Infinity // Smallest event since the last landing
  const onWheel = (e) => {
    if (skip(e) || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    const now = performance.now()
    const gap = now - lastWheel
    const size = Math.abs(e.deltaY)
    const stalledFade = gap < 1000 && size < lastSize && size >= lastSize * 0.5
    lastWheel = now
    lastSize = size
    e.preventDefault()
    if (gliding) {
      armed = false
      tail = Infinity
      return
    }
    tail = Math.min(tail, size)
    if ((gap > NEW_GESTURE_GAP && !stalledFade) || (size >= 12 && size >= tail * 4)) {
      armed = true
      leftover = false
      tail = size
    }
    const dir = Math.sign(e.deltaY)
    if (!dir) return
    const list = screens()
    const here = list[currentIndex(list)]
    if (leftover) return
    if (insideTall(here, dir)) {
      // A tall chapter scrolls by hand, stopping exactly at its edge. The next chapter
      // takes a fresh gesture, so a single flick can't run on through it.
      armed = false
      const r = here.getBoundingClientRect()
      const room = dir > 0 ? r.bottom - window.innerHeight : -r.top
      window.scrollBy({ top: dir * Math.min(size, room), behavior: 'instant' })
      return
    }
    if (!armed || size < 3) return
    armed = false
    leftover = true
    turn(dir)
  }

  // Touch: decide on finger lift, from where the swipe began. A swipe that began with room left
  // in a tall chapter is ordinary scrolling; one that began at its edge turns the page.
  const MIN_SWIPE = 28
  let swipe = null
  const onTouchStart = (e) => {
    const t = e.touches[0]
    if (e.touches.length !== 1) {
      swipe = null
      return
    }
    const list = screens()
    const here = list[currentIndex(list)]
    swipe = { x: t.clientX, y: t.clientY, here, roomDown: insideTall(here, 1), roomUp: insideTall(here, -1) }
  }
  const onTouchEnd = (e) => {
    if (!swipe || popupOpen()) return
    const t = e.changedTouches[0]
    const dy = swipe.y - t.clientY
    const dx = swipe.x - t.clientX
    const { here, roomDown, roomUp } = swipe
    swipe = null
    if (Math.abs(dy) < MIN_SWIPE || Math.abs(dx) > Math.abs(dy)) return
    const dir = Math.sign(dy)
    if (dir > 0 ? roomDown : roomUp) return
    const list = screens()
    const target = list[list.indexOf(here) + dir]
    if (!target) return
    const block = dir < 0 && tooTall(target) ? 'end' : 'start'
    glide(target, block)
    // The browser's own momentum can win the first round; make sure the turn still lands.
    setTimeout(() => {
      const r = target.getBoundingClientRect()
      const landed = block === 'end' ? Math.abs(r.bottom - window.innerHeight) < 4 : Math.abs(r.top) < 4
      if (!landed) glide(target, block)
    }, 450)
  }

  const onKey = (e) => {
    if (skip(e)) return
    const tag = e.target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
    const onControl = tag === 'BUTTON' || tag === 'A' || e.target.getAttribute?.('role') === 'button'
    let dir = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown') dir = 1
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1
    else if (e.key === ' ' && !onControl) dir = e.shiftKey ? -1 : 1
    if (!dir) return
    if (gliding) return e.preventDefault()
    const list = screens()
    if (insideTall(list[currentIndex(list)], dir)) return
    e.preventDefault()
    turn(dir)
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  return () => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) glide(el)
}
