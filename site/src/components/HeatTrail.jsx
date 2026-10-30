import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'
import { clickPts, getLab, path, subscribe } from '../lib/lab'

// Heatmap toy: a soft trail behind the cursor or finger, plus the visit's clicks when the
// analytics panel turns the heatmap on. It only draws when there is something to draw. With
// reduced motion the trail stays off, and the heatmap appears as a still image on request.
export default function HeatTrail() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = reducedMotion()
    const pts = []
    let raf = 0

    const blob = (x, y, r, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(193, 18, 31, ${a})`)
      g.addColorStop(0.5, `rgba(244, 162, 97, ${a * 0.6})`)
      g.addColorStop(1, 'rgba(102, 155, 188, 0)')
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (getLab().heat) {
        for (let i = 0; i < path.length; i += 3) blob(path[i].x, path[i].y, 34, 0.1)
        for (const c of clickPts) blob(c.x, c.y, 48, 0.55)
      }
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i]
        p.life -= 0.03
        if (p.life <= 0) {
          pts.splice(i, 1)
          continue
        }
        blob(p.x, p.y, 40, 0.22 * p.life)
      }
    }
    // A full-screen blended layer is costly to scroll under, so it only exists while in use.
    const show = (on) => {
      canvas.style.visibility = on ? 'visible' : 'hidden'
    }
    const loop = () => {
      paint()
      const busy = pts.length || getLab().heat
      raf = busy ? requestAnimationFrame(loop) : 0
      show(busy)
    }
    const wake = () => {
      if (still) {
        paint()
        show(getLab().heat)
      } else if (!raf) {
        show(true)
        raf = requestAnimationFrame(loop)
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      wake()
    }
    const move = (e) => {
      const last = pts[pts.length - 1]
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 14) return
      pts.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (pts.length > 32) pts.shift()
      wake()
    }

    resize()
    window.addEventListener('resize', resize)
    if (!still) window.addEventListener('pointermove', move, { passive: true })
    const unsub = subscribe(wake)
    return () => {
      cancelAnimationFrame(raf)
      unsub()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{ mixBlendMode: 'var(--heat-blend)' }}
    />
  )
}
