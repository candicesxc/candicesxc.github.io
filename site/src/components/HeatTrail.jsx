import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'
import { clickPts, getLab, path } from '../lib/lab'

// Fake click-heatmap that follows the cursor or finger across the whole page.
export default function HeatTrail() {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const pts = []
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const move = (e) => {
      const last = pts[pts.length - 1]
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 14) return
      pts.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (pts.length > 48) pts.shift()
    }
    const blob = (x, y, r, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(193, 18, 31, ${a})`)
      g.addColorStop(0.5, `rgba(244, 162, 97, ${a * 0.6})`)
      g.addColorStop(1, 'rgba(102, 155, 188, 0)')
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (getLab().heat) {
        for (let i = 0; i < path.length; i += 3) blob(path[i].x, path[i].y, 34, 0.1)
        for (const c of clickPts) blob(c.x, c.y, 48, 0.55)
      }
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i]
        p.life -= 0.02
        if (p.life <= 0) {
          pts.splice(i, 1)
          continue
        }
        const r = 46
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        g.addColorStop(0, `rgba(193, 18, 31, ${0.34 * p.life})`)
        g.addColorStop(0.45, `rgba(244, 162, 97, ${0.2 * p.life})`)
        g.addColorStop(1, 'rgba(102, 155, 188, 0)')
        ctx.fillStyle = g
        ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2)
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
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
