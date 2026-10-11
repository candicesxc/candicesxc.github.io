import { reducedMotion } from './scroll'

// Tiny shared store behind the "analytics" toys: clicks, heatmap, replay, conversion.
const state = { clicks: 0, heat: false, converted: false, replaying: false }
let snapshot = { ...state }
const subs = new Set()
const emit = () => {
  snapshot = { ...state }
  subs.forEach((fn) => fn())
}

export const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}
export const getLab = () => snapshot

// Recorded pointer samples ({x, y, t, click}) and click positions, in viewport coordinates.
export const path = []
export const clickPts = []

function float(x, y, text) {
  if (reducedMotion()) return
  const el = document.createElement('span')
  el.className = 'fx-float label'
  el.textContent = text
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove())
}

export function initLab() {
  let last = 0
  const move = (e) => {
    if (state.replaying) return
    const now = performance.now()
    if (now - last < 30) return
    last = now
    path.push({ x: e.clientX, y: e.clientY, t: now })
    if (path.length > 600) path.shift()
  }
  const down = (e) => {
    if (state.replaying) return
    state.clicks += 1
    clickPts.push({ x: e.clientX, y: e.clientY })
    if (clickPts.length > 200) clickPts.shift()
    path.push({ x: e.clientX, y: e.clientY, t: performance.now(), click: true })
    float(e.clientX, e.clientY, '+1 click')
    emit()
  }
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('pointerdown', down, { passive: true })
  return () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerdown', down)
  }
}

// Little shards flying out from a popped bubble.
export function burst(x, y) {
  if (reducedMotion()) return
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('span')
    const a = (i / 8) * Math.PI * 2
    el.className = 'fx-bit'
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.setProperty('--dx', `${Math.cos(a) * 60}px`)
    el.style.setProperty('--dy', `${Math.sin(a) * 60}px`)
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }
}

export function setHeat(on) {
  state.heat = on
  emit()
}

export function convert() {
  if (!state.converted) {
    state.converted = true
    emit()
  }
  if (reducedMotion()) return
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('span')
    el.className = 'fx-candy'
    el.textContent = i % 2 ? '🍬' : '🍭'
    el.style.left = `${Math.random() * 100}vw`
    el.style.animationDuration = `${1.6 + Math.random() * 1.6}s`
    el.style.animationDelay = `${Math.random() * 0.5}s`
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }
}

// Plays the visitor's own pointer path back with a ghost cursor, sped up.
export function replay() {
  if (state.replaying || path.length < 5) return false
  const pts = path.slice()
  // Squash idle gaps so the replay never sits still.
  const times = [0]
  for (let i = 1; i < pts.length; i++) {
    times.push(times[i - 1] + Math.min(pts[i].t - pts[i - 1].t, 250))
  }
  const speed = 3
  const total = times[times.length - 1] / speed

  const ghost = document.createElement('div')
  ghost.className = 'fx-ghost'
  ghost.innerHTML = '<i></i><span class="label">session replay · 3x</span>'
  document.body.appendChild(ghost)
  state.replaying = true
  emit()

  const start = performance.now()
  let i = 0
  const step = (now) => {
    const el = (now - start) * speed
    while (i < pts.length - 1 && times[i + 1] <= el) {
      i += 1
      if (pts[i].click) {
        const ring = document.createElement('span')
        ring.className = 'fx-ring'
        ring.style.left = `${pts[i].x}px`
        ring.style.top = `${pts[i].y}px`
        document.body.appendChild(ring)
        ring.addEventListener('animationend', () => ring.remove())
      }
    }
    ghost.style.transform = `translate(${pts[i].x}px, ${pts[i].y}px)`
    if (now - start < total) {
      requestAnimationFrame(step)
    } else {
      ghost.remove()
      state.replaying = false
      emit()
    }
  }
  requestAnimationFrame(step)
  return true
}
