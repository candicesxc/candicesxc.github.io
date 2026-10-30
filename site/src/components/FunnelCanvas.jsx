import { useEffect, useRef } from 'react'
import { FUNNEL, LOGOS } from '../content'
import { burst } from '../lib/lab'
import { reducedMotion } from '../lib/scroll'

// Candies, lollipops and sprinkles pour down a funnel; most "drop off" out the sides, a few
// convert. Small candy-wrapped logos from past chapters ride down with them and burst when poked.
//
// Each candy is painted once into a little sprite with the same light from the top left, then
// stamped each frame. That is what buys the richer look (and it is cheaper than the old flat
// shapes). Three depth layers do the rest: small soft candies far back, a main middle layer, and
// a few larger, crisp ones up front.

const LAYERS = [
  { share: 0.48, size: [8, 11], alpha: 0.5, blur: 1.1, speed: 0.72, sprite: 22 },
  { share: 0.44, size: [14, 19], alpha: 0.96, blur: 0, speed: 1, sprite: 38 },
  { share: 0.08, size: [26, 34], alpha: 1, blur: 0, speed: 1.22, sprite: 68 },
]
const DROPPED = '#b9b3a3'
const INK = '#003049'

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  const mix = (c) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount)
  return `rgb(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`
}

// Paints one candy centred on the origin, `s` being its overall scale.
function paintCandy(c, kind, color, s) {
  const outline = shade(color, -0.42)
  const glossy = () => {
    const g = c.createRadialGradient(-s * 0.13, -s * 0.13, s * 0.02, 0, 0, s * 0.42)
    g.addColorStop(0, shade(color, 0.5))
    g.addColorStop(0.55, color)
    g.addColorStop(1, shade(color, -0.2))
    return g
  }
  c.lineWidth = Math.max(0.7, s * 0.035)
  c.lineJoin = 'round'
  c.lineCap = 'round'

  if (kind === 2) {
    // Sprinkle: a small glazed capsule
    c.lineWidth = s * 0.16
    c.strokeStyle = color
    c.beginPath()
    c.moveTo(-s * 0.17, 0)
    c.lineTo(s * 0.17, 0)
    c.stroke()
    c.lineWidth = s * 0.045
    c.strokeStyle = 'rgba(255, 255, 255, 0.55)'
    c.beginPath()
    c.moveTo(-s * 0.13, -s * 0.03)
    c.lineTo(s * 0.06, -s * 0.03)
    c.stroke()
    return
  }

  if (kind === 1) {
    // Lollipop: cream stick, glossy disc, a cream swirl and one highlight
    c.strokeStyle = '#fffaf0'
    c.lineWidth = s * 0.075
    c.beginPath()
    c.moveTo(0, 0)
    c.lineTo(0, s * 0.78)
    c.stroke()
    c.lineWidth = Math.max(0.7, s * 0.035)
    c.save()
    c.translate(0, -s * 0.22)
    c.fillStyle = glossy()
    c.strokeStyle = outline
    c.beginPath()
    c.arc(0, 0, s * 0.38, 0, Math.PI * 2)
    c.fill()
    c.stroke()
    c.strokeStyle = 'rgba(255, 250, 240, 0.8)'
    c.lineWidth = s * 0.055
    c.beginPath()
    for (let a = 0; a < Math.PI * 3.2; a += 0.2) {
      const r = s * 0.035 * (1 + a * 0.7)
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (a === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }
    c.stroke()
    c.fillStyle = 'rgba(255, 255, 255, 0.7)'
    c.beginPath()
    c.ellipse(-s * 0.15, -s * 0.18, s * 0.08, s * 0.045, -0.7, 0, Math.PI * 2)
    c.fill()
    c.restore()
    return
  }

  // Wrapped candy: two pleated wrapper tails, a glossy body, a soft stripe and a highlight
  for (const dir of [-1, 1]) {
    const g = c.createLinearGradient(0, -s * 0.28, 0, s * 0.28)
    g.addColorStop(0, shade(color, 0.42))
    g.addColorStop(1, shade(color, -0.08))
    c.fillStyle = g
    c.strokeStyle = outline
    c.beginPath()
    c.moveTo(dir * s * 0.3, -s * 0.05)
    c.lineTo(dir * s * 0.74, -s * 0.28)
    c.quadraticCurveTo(dir * s * 0.66, 0, dir * s * 0.74, s * 0.28)
    c.lineTo(dir * s * 0.3, s * 0.05)
    c.closePath()
    c.fill()
    c.stroke()
    c.strokeStyle = 'rgba(255, 255, 255, 0.4)'
    c.beginPath()
    c.moveTo(dir * s * 0.38, 0)
    c.lineTo(dir * s * 0.64, -s * 0.12)
    c.moveTo(dir * s * 0.38, 0.01)
    c.lineTo(dir * s * 0.64, s * 0.13)
    c.stroke()
  }
  c.fillStyle = glossy()
  c.strokeStyle = outline
  c.beginPath()
  c.ellipse(0, 0, s * 0.37, s * 0.28, 0, 0, Math.PI * 2)
  c.fill()
  c.stroke()
  c.save()
  c.clip()
  c.strokeStyle = 'rgba(255, 250, 240, 0.32)'
  c.lineWidth = s * 0.07
  for (const x of [-0.18, 0.04, 0.26]) {
    c.beginPath()
    c.moveTo(s * x - s * 0.1, -s * 0.32)
    c.lineTo(s * x + s * 0.1, s * 0.32)
    c.stroke()
  }
  c.restore()
  c.fillStyle = 'rgba(255, 255, 255, 0.75)'
  c.beginPath()
  c.ellipse(-s * 0.13, -s * 0.13, s * 0.085, s * 0.04, -0.45, 0, Math.PI * 2)
  c.fill()
}

function makeSprite(kind, color, layer, dpr) {
  const box = layer.sprite * 2.1
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = Math.ceil(box * dpr)
  const c = canvas.getContext('2d')
  c.scale(dpr, dpr)
  c.translate(box / 2, box / 2)
  if (layer.blur && 'filter' in c) c.filter = `blur(${layer.blur}px)`
  paintCandy(c, kind, color, layer.sprite)
  return canvas
}

// Painted once per page view and shared, so nothing has to be baked mid-animation.
const sprites = new Map()
function spriteFor(kind, color, layerIndex, dpr) {
  const key = `${kind}|${color}|${layerIndex}|${dpr}`
  if (!sprites.has(key)) sprites.set(key, makeSprite(kind, color, LAYERS[layerIndex], dpr))
  return sprites.get(key)
}

// A soft-edged rectangle: 0 well clear of it, 1 inside it.
function coverage(rect, x, y) {
  if (!rect) return 0
  const edge = 70
  const dx = Math.max(rect.left - x, 0, x - rect.right)
  const dy = Math.max(rect.top - y, 0, y - rect.bottom)
  return Math.max(0, 1 - Math.hypot(dx, dy) / edge)
}

export default function FunnelCanvas({ avoid, className = 'absolute inset-0' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return // No canvas? The copy stands fine on its own.
    const colors = FUNNEL.map((s) => s.color)
    const still = reducedMotion()
    const pointer = { x: -9999, y: -9999 }
    // Slower machines and data-saver visitors get a lighter pour.
    const low =
      navigator.connection?.saveData || navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 2
    const dpr = Math.min(window.devicePixelRatio || 1, low ? 1.5 : 2)
    let w = 0
    let cx = 0
    let spread = 1
    let h = 0
    let raf = 0
    let last = 0
    let onScreen = true
    let rect = null

    // Phones get a fuller funnel: fewer candies drop out and it stays wide further down,
    // so it fills the open space under the copy.
    const small = window.innerWidth < 768

    // Bake every candy up front: painting one for the first time mid-animation shows as a hitch.
    for (const color of [...colors, DROPPED]) {
      LAYERS.forEach((_, layerIndex) => {
        for (const kind of layerIndex === 2 ? [0, 1] : [0, 1, 2]) spriteFor(kind, color, layerIndex, dpr)
      })
    }

    const spawn = (p, fresh) => {
      const layer = LAYERS[p.layer]
      p.t = fresh ? Math.random() : -0.03
      p.u = Math.random() * 2 - 1
      p.v = (0.0012 + Math.random() * 0.0013) * layer.speed
      p.drop = Math.random() < (small ? 0.42 : 0.72) ? 0.08 + Math.random() * 0.8 : 2
      p.out = 0
      p.dir = 0
      p.ox = 0
      p.oy = 0
      p.size = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0])
      p.rot = (Math.random() - 0.5) * 1.6
      p.spin = (Math.random() - 0.5) * 0.008
      p.phase = Math.random() * Math.PI * 2
      // Up front only candies and lollipops; sprinkles are for the background
      p.shape = p.layer === 2 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3)
    }
    const total = Math.round((small ? 190 : 320) * (low ? 0.6 : 1))
    const ps = []
    LAYERS.forEach((layer, layerIndex) => {
      const n = Math.round(total * layer.share)
      for (let i = 0; i < n; i++) {
        const p = { layer: layerIndex }
        spawn(p, true)
        ps.push(p)
      }
    })
    const byLayer = LAYERS.map((_, i) => ps.filter((p) => p.layer === i))

    const respawn = (b, t) => {
      b.t = t
      b.u = Math.random() * 1.4 - 0.7
      b.v = 0.0008 + Math.random() * 0.0005
      b.r = (small ? 14 : 17) + Math.random() * 3
      b.phase = Math.random() * Math.PI * 2
      b.wait = 0
    }
    const bubbles = LOGOS.map((logo, i) => {
      const b = { img: new Image(), x: -99, y: -99 }
      b.img.onload = () => still && draw(0)
      b.img.src = logo.src
      respawn(b, i / LOGOS.length)
      return b
    })

    const measureAvoid = () => {
      if (!avoid?.current) return
      const a = avoid.current.getBoundingClientRect()
      const c = canvas.getBoundingClientRect()
      rect = { left: a.left - c.left, right: a.right - c.left, top: a.top - c.top, bottom: a.bottom - c.top }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      const wide = w >= 768
      cx = wide ? w * 0.74 : w / 2
      spread = wide ? 0.52 : 1
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureAvoid()
      if (still) draw(0)
    }

    const half = (t) => {
      const k = 1 - Math.min(Math.max(t, 0), 1)
      return w * spread * (small ? 0.16 + 0.36 * Math.pow(k, 0.9) : 0.035 + 0.44 * Math.pow(k, 1.8))
    }

    const drawCandy = (p, step, now) => {
      const layer = LAYERS[p.layer]
      const dropped = p.t > p.drop
      if (step) {
        p.t += (dropped ? p.v * 0.4 : p.v) * step
        p.rot += p.spin * step
        if (dropped) {
          if (!p.dir) p.dir = Math.sign(p.u) || 1
          p.out += 0.009 * step
        }
        if (p.t > 1.04 || p.out > 1) spawn(p, false)
      }
      const sway = Math.sin(now * 0.7 + p.phase) * 4
      let x = cx + p.u * half(p.t) + p.dir * p.out * w * spread * 0.16 + sway
      let y = p.t * h
      // Candies lean away from the cursor, a little, and drift back.
      const R = 90
      const dx = x + p.ox - pointer.x
      const dy = y + p.oy - pointer.y
      const d = Math.hypot(dx, dy)
      if (d < R && d > 0.01) {
        const f = (1 - d / R) * 1.5 * (step || 1)
        p.ox += (dx / d) * f
        p.oy += (dy / d) * f
      }
      p.ox *= 0.94
      p.oy *= 0.94
      x += p.ox
      y += p.oy

      const hide = coverage(rect, x, y)
      const alpha = (dropped ? Math.max(0, 1 - p.out) * 0.4 : layer.alpha) * (1 - hide * 0.9)
      if (alpha < 0.01) return

      const color = dropped ? DROPPED : colors[Math.min(colors.length - 1, Math.max(0, Math.floor(p.t * colors.length)))]
      const sprite = spriteFor(p.shape, color, p.layer, dpr)
      const size = (p.size / layer.sprite) * layer.sprite * 2.1
      ctx.globalAlpha = alpha
      ctx.translate(x, y)
      ctx.rotate(p.rot)
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawBubble = (b, step, now) => {
      if (b.wait > 0) {
        b.wait -= step || 1
        if (b.wait <= 0) respawn(b, -0.04)
        return
      }
      if (step) {
        b.t += b.v * step
        if (b.t > 1.05) respawn(b, -0.04)
      }
      b.x = cx + b.u * half(b.t) + Math.sin(now * 0.7 + b.phase) * 5
      b.y = b.t * h
      // Logos vanish fully behind the copy; a ghost logo reads as a smudge on the words.
      const alpha = 1 - coverage(rect, b.x, b.y)
      b.hidden = alpha < 0.5
      ctx.globalAlpha = alpha
      // Same wrapper as the candies, same light, with the company on the sweet
      for (const dir of [-1, 1]) {
        ctx.beginPath()
        ctx.moveTo(b.x + dir * b.r * 0.85, b.y - b.r * 0.2)
        ctx.lineTo(b.x + dir * b.r * 1.55, b.y - b.r * 0.55)
        ctx.quadraticCurveTo(b.x + dir * b.r * 1.38, b.y, b.x + dir * b.r * 1.55, b.y + b.r * 0.55)
        ctx.lineTo(b.x + dir * b.r * 0.85, b.y + b.r * 0.2)
        ctx.closePath()
        ctx.fillStyle = '#fffaf0'
        ctx.fill()
        ctx.lineWidth = 1.5
        ctx.strokeStyle = INK
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = INK
      ctx.stroke()
      if (b.img.complete && b.img.naturalWidth) {
        const s = b.r * 1.2
        const k = Math.min(s / b.img.naturalWidth, s / b.img.naturalHeight)
        const iw = b.img.naturalWidth * k
        const ih = b.img.naturalHeight * k
        ctx.drawImage(b.img, b.x - iw / 2, b.y - ih / 2, iw, ih)
      }
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r - 3, Math.PI * 1.1, Math.PI * 1.45)
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'rgba(0, 48, 73, 0.14)'
      ctx.stroke()
    }

    const draw = (step) => {
      ctx.clearRect(0, 0, w, h)
      const now = performance.now() / 1000
      byLayer[0].forEach((p) => drawCandy(p, step, now))
      byLayer[1].forEach((p) => drawCandy(p, step, now))
      bubbles.forEach((b) => drawBubble(b, step, now))
      byLayer[2].forEach((p) => drawCandy(p, step, now))
      ctx.globalAlpha = 1
    }

    // The canvas sits behind the text, so listen on the window and hit-test by hand.
    const poke = (e) => {
      if (e.target.closest('a, button')) return
      const r = canvas.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      const hit = bubbles.find((b) => !b.wait && !b.hidden && Math.hypot(b.x - px, b.y - py) < b.r + 10)
      if (!hit) return
      burst(e.clientX, e.clientY)
      hit.wait = 80
      hit.x = hit.y = -99
    }

    // Runs only while the hero is on screen and the tab is showing. Time-based, so a phone
    // at 60 frames and a monitor at 120 pour at the same calm speed.
    const loop = (t) => {
      const step = last ? Math.min((t - last) / 16.67, 3) : 1
      last = t
      draw(step)
      raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      const run = !still && onScreen && !document.hidden
      if (run && !raf) {
        last = 0
        raf = requestAnimationFrame(loop)
      } else if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    // Mouse only: a finger scrolling the page should not shove the candy around.
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    if (avoid?.current) ro.observe(avoid.current)
    resize()
    document.fonts?.ready.then(measureAvoid)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', poke, { passive: true })
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', poke)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [avoid])

  return <canvas ref={ref} className={`${className} h-full w-full`} aria-hidden="true" />
}
