import { useEffect, useRef } from 'react'
import { FUNNEL, LOGOS } from '../content'
import { burst } from '../lib/lab'
import { reducedMotion } from '../lib/scroll'

// Candies, lollipops and sprinkles pour down a funnel; most "drop off" out the sides, a few convert.
// Small logo bubbles from past chapters ride down with them and burst when poked.
export default function FunnelCanvas({ className = 'absolute inset-0' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const colors = FUNNEL.map((s) => s.color)
    const still = reducedMotion()
    const pointer = { x: -9999, y: -9999 }
    let w = 0
    let cx = 0
    let spread = 1
    let h = 0
    let raf = 0
    let visible = true

    // Phones get a fuller funnel: fewer candies drop out and it stays wide further down,
    // so it fills the open space under the copy.
    const small = window.innerWidth < 768

    const spawn = (p, fresh) => {
      p.t = fresh ? Math.random() : -0.02
      p.u = Math.random() * 2 - 1
      p.v = 0.0012 + Math.random() * 0.0022
      p.drop = Math.random() < (small ? 0.42 : 0.72) ? 0.08 + Math.random() * 0.8 : 2
      p.out = 0
      p.dir = 0
      p.ox = 0
      p.oy = 0
      p.size = 11 + Math.random() * 12
      p.rot = (Math.random() - 0.5) * 1.4
      p.shape = Math.floor(Math.random() * 3)
    }
    const count = small ? 400 : 360
    const ps = Array.from({ length: count }, () => {
      const p = {}
      spawn(p, true)
      return p
    })

    const respawn = (b, t) => {
      b.t = t
      b.u = Math.random() * 1.4 - 0.7
      b.v = 0.0008 + Math.random() * 0.0007
      b.r = (small ? 13 : 15) + Math.random() * 4
      b.phase = Math.random() * Math.PI * 2
      b.wait = 0
    }
    const bubbles = LOGOS.map((logo, i) => {
      const b = { img: new Image(), x: -99, y: -99 }
      b.img.onload = () => still && draw()
      b.img.src = logo.src
      respawn(b, i / LOGOS.length)
      return b
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      const wide = w >= 768
      cx = wide ? w * 0.72 : w / 2
      spread = wide ? 0.58 : 1
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (still) draw()
    }

    // 0 = wrapped candy, 1 = lollipop, 2 = sprinkle dot
    const shape = (kind, x, y, s, rot) => {
      if (kind === 2) {
        ctx.beginPath()
        ctx.arc(x, y, s * 0.2, 0, Math.PI * 2)
        ctx.fill()
        return
      }
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.beginPath()
      if (kind === 0) {
        ctx.ellipse(0, 0, s * 0.36, s * 0.26, 0, 0, Math.PI * 2)
        ctx.moveTo(-s * 0.32, 0)
        ctx.lineTo(-s * 0.72, -s * 0.26)
        ctx.lineTo(-s * 0.72, s * 0.26)
        ctx.closePath()
        ctx.moveTo(s * 0.32, 0)
        ctx.lineTo(s * 0.72, -s * 0.26)
        ctx.lineTo(s * 0.72, s * 0.26)
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.arc(0, -s * 0.25, s * 0.36, 0, Math.PI * 2)
        ctx.rect(-s * 0.04, 0, s * 0.08, s * 0.8)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(0, -s * 0.25, s * 0.19, 0.4, Math.PI * 1.6)
        ctx.lineWidth = Math.max(1, s * 0.07)
        ctx.strokeStyle = 'rgba(255, 250, 240, 0.75)'
        ctx.stroke()
      }
      ctx.restore()
    }

    const half = (t) => {
      const k = 1 - Math.min(Math.max(t, 0), 1)
      return w * spread * (small ? 0.16 + 0.36 * Math.pow(k, 0.9) : 0.035 + 0.44 * Math.pow(k, 1.8))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const R = 110
      for (const p of ps) {
        const dropped = p.t > p.drop
        if (!still) {
          p.t += dropped ? p.v * 0.35 : p.v
          if (dropped) {
            if (!p.dir) p.dir = Math.sign(p.u) || 1
            p.out += 0.012
          }
          if (p.t > 1.04 || p.out > 1) spawn(p, false)
        }
        let x = cx + p.u * half(p.t) + p.dir * p.out * w * spread * 0.16
        let y = p.t * h
        const dx = x + p.ox - pointer.x
        const dy = y + p.oy - pointer.y
        const d = Math.hypot(dx, dy)
        if (d < R && d > 0.01) {
          const f = (1 - d / R) * 5
          p.ox += (dx / d) * f
          p.oy += (dy / d) * f
        }
        p.ox *= 0.92
        p.oy *= 0.92
        x += p.ox
        y += p.oy
        if (dropped) {
          ctx.globalAlpha = Math.max(0, 1 - p.out) * 0.45
          ctx.fillStyle = '#b9b3a3'
        } else {
          ctx.globalAlpha = 0.95
          ctx.fillStyle = colors[Math.min(colors.length - 1, Math.max(0, Math.floor(p.t * colors.length)))]
        }
        shape(p.shape, x, y, p.size, p.rot)
      }
      ctx.globalAlpha = 1

      const now = performance.now() / 1000
      for (const b of bubbles) {
        if (b.wait > 0) {
          b.wait -= 1
          if (b.wait === 0) respawn(b, -0.04)
          continue
        }
        if (!still) {
          b.t += b.v
          if (b.t > 1.05) respawn(b, -0.04)
        }
        b.x = cx + b.u * half(b.t) + Math.sin(now * 1.3 + b.phase) * 6
        b.y = b.t * h
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.lineWidth = 1.5
        ctx.strokeStyle = '#003049'
        ctx.stroke()
        if (b.img.complete && b.img.naturalWidth) {
          const s = b.r * 1.15
          const k = Math.min(s / b.img.naturalWidth, s / b.img.naturalHeight)
          const iw = b.img.naturalWidth * k
          const ih = b.img.naturalHeight * k
          ctx.drawImage(b.img, b.x - iw / 2, b.y - ih / 2, iw, ih)
        }
      }
    }

    // The canvas sits behind the text, so listen on the window and hit-test by hand.
    const poke = (e) => {
      if (e.target.closest('a, button')) return
      const r = canvas.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      const hit = bubbles.find((b) => !b.wait && Math.hypot(b.x - px, b.y - py) < b.r + 10)
      if (!hit) return
      burst(e.clientX, e.clientY)
      hit.wait = 80
      hit.x = hit.y = -99
    }

    const loop = () => {
      if (visible) draw()
      raf = requestAnimationFrame(loop)
    }

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const leave = () => {
      pointer.x = pointer.y = -9999
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', leave, { passive: true })
    window.addEventListener('pointerdown', poke, { passive: true })
    if (!still) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', leave)
      window.removeEventListener('pointerdown', poke)
    }
  }, [])

  return <canvas ref={ref} className={`${className} h-full w-full`} aria-hidden="true" />
}
