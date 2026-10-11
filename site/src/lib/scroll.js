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

// One gesture, one page. Any real scroll (a swipe, a turn of the wheel, a trackpad
// flick, the arrow/page/space keys) moves exactly one screen in that direction, however
// small it was. CSS snap alone would spring back from anything under half a screen.
// Left alone: sideways gestures (photo strips, the map), taps, and open pop-ups.
function initPaging() {
  const screens = () => [...document.querySelectorAll('.screen')]
  const nearest = (list) => {
    let best = 0
    list.forEach((el, i) => {
      if (Math.abs(el.offsetTop - window.scrollY) < Math.abs(list[best].offsetTop - window.scrollY)) best = i
    })
    return best
  }
  const popupOpen = () => Boolean(document.querySelector('[aria-modal="true"]'))

  let lockedUntil = 0
  const turn = (dir, from) => {
    const list = screens()
    const index = Math.min(list.length - 1, Math.max(0, (from ?? nearest(list)) + dir))
    const target = list[index]
    const go = () => target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
    lockedUntil = performance.now() + 850
    requestAnimationFrame(go)
    // The browser's own momentum can win the first round; make sure we still arrive.
    setTimeout(() => {
      if (list[nearest(list)] !== target) go()
    }, 420)
  }

  // Touch: decide on finger lift, from the screen the swipe started on.
  const MIN_SWIPE = 28
  let start = null
  const onTouchStart = (e) => {
    const t = e.touches[0]
    start = e.touches.length === 1 ? { x: t.clientX, y: t.clientY, index: nearest(screens()) } : null
  }
  const onTouchEnd = (e) => {
    if (!start || popupOpen()) return
    const t = e.changedTouches[0]
    const dy = start.y - t.clientY
    const dx = start.x - t.clientX
    const from = start.index
    start = null
    if (Math.abs(dy) < MIN_SWIPE || Math.abs(dx) > Math.abs(dy)) return
    turn(Math.sign(dy), from)
  }

  // Wheel and trackpad: take over vertical scrolling. A page turn locks out the rest of
  // the same gesture (trackpads keep sending fading "momentum" events for a second or so).
  let lastWheel = 0
  const onWheel = (e) => {
    if (e.ctrlKey || popupOpen()) return
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    e.preventDefault()
    const now = performance.now()
    const fresh = now - lastWheel > 160
    lastWheel = now
    if (now < lockedUntil) return
    // Right after a turn, only a new gesture or a firm push counts, not leftover momentum.
    if (!fresh && Math.abs(e.deltaY) < 18) return
    if (Math.abs(e.deltaY) < 3) return
    turn(Math.sign(e.deltaY))
  }

  const onKey = (e) => {
    if (popupOpen() || e.altKey || e.ctrlKey || e.metaKey) return
    const tag = e.target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
    const onControl = tag === 'BUTTON' || tag === 'A' || e.target.getAttribute?.('role') === 'button'
    let dir = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown') dir = 1
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1
    else if (e.key === ' ' && !onControl) dir = e.shiftKey ? -1 : 1
    if (!dir) return
    e.preventDefault()
    if (performance.now() >= lockedUntil) turn(dir)
  }

  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  return () => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
  }
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
}
