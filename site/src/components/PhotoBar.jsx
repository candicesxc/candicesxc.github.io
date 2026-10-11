import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/scroll'
import Lightbox from './Lightbox'

// A sideways strip of square photos with a slider underneath: drag the knob,
// swipe the strip, or use the arrows to travel from `from` (left) to `to` (right).
// It drifts left to right on its own until the visitor touches it.
// With `fitDesktop`, wide screens show every piece side by side and drop the slider.
export default function PhotoBar({ photos, from, to, maxHeight, fitDesktop, zoom }) {
  const strip = useRef(null)
  const [pos, setPos] = useState(0)
  const [auto, setAuto] = useState(() => !reducedMotion())
  const [enlarged, setEnlarged] = useState(null)

  const max = () => strip.current.scrollWidth - strip.current.clientWidth

  useEffect(() => {
    const el = strip.current
    const onScroll = () => setPos(max() > 0 ? el.scrollLeft / max() : 0)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!auto) return
    const el = strip.current
    let raf = 0
    let last = 0
    let x = el.scrollLeft
    let visible = false
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      last = 0
    }, { threshold: 0.5 })
    io.observe(el)
    const tick = (now) => {
      if (visible) {
        if (last) x = Math.min(x + ((now - last) / 1000) * 32, max())
        last = now
        el.scrollLeft = x
        if (x >= max()) return setAuto(false)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [auto])

  const stop = () => setAuto(false)

  const nudge = (dir) => strip.current.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: 'smooth' })

  return (
    <div
      onPointerDown={stop}
      onWheel={stop}
      onKeyDown={stop}
      className={`flex max-h-[var(--bar-max)] min-h-0 flex-1 flex-col ${maxHeight ? 'mt-[6svh]' : 'mt-[5.5svh] md:mt-[3svh]'} ${
        fitDesktop ? 'md:max-h-none md:flex-none' : ''
      }`}
      style={{ '--bar-max': `${maxHeight || 400}px` }}
    >
      <div
        ref={strip}
        tabIndex={0}
        role="group"
        aria-label={`Photos, from ${from} to ${to}`}
        className={`photo-strip -mx-3 flex min-h-0 flex-1 scroll-px-3 gap-4 overflow-x-auto px-3 py-3 md:gap-5 ${auto ? '' : 'snap-x'} ${
          fitDesktop ? 'md:flex-none md:items-start md:gap-7 md:overflow-visible lg:gap-10' : ''
        }`}
      >
        {photos.map((photo, i) => {
          // A plain path is a square photo; an object can carry its own shape and alt text.
          const p = typeof photo === 'string' ? { src: photo } : photo
          return (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt || `Candice, photo ${i + 1} of ${photos.length}`}
              loading="lazy"
              draggable="false"
              {...(zoom && {
                role: 'button',
                tabIndex: 0,
                'aria-label': `Enlarge: ${p.alt}`,
                onClick: () => setEnlarged(p),
                onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && setEnlarged(p),
              })}
              className={`h-full w-auto shrink-0 snap-start rounded-[22px] border-[1.5px] border-ink bg-card object-cover shadow-[4px_4px_0_var(--ink)] ${
                fitDesktop ? 'md:h-auto md:min-w-0 md:[flex:var(--grow)_1_0%]' : ''
              } ${zoom ? 'cursor-zoom-in transition-[filter] hover:brightness-95' : ''}`}
              style={{
                aspectRatio: p.ratio || 1,
                '--grow': p.ratio || 1,
                transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)`,
              }}
            />
          )
        })}
        <span className={`w-1 shrink-0 ${fitDesktop ? 'md:hidden' : ''}`} aria-hidden="true" />
      </div>

      <div className={`mt-2 flex shrink-0 items-center gap-3 ${fitDesktop ? 'md:hidden' : ''}`}>
        <button type="button" onClick={() => nudge(-1)} aria-label="Earlier photos" className="photo-arrow">
          ←
        </button>
        <span className="note shrink-0">{from}</span>
        <input
          type="range"
          min="0"
          max="1000"
          value={Math.round(pos * 1000)}
          onChange={(e) => {
            strip.current.scrollLeft = (e.target.value / 1000) * max()
          }}
          aria-label={`Slide from ${from} to ${to}`}
          className="photo-range min-w-0 flex-1"
        />
        <span className="note shrink-0">{to}</span>
        <button type="button" onClick={() => nudge(1)} aria-label="Later photos" className="photo-arrow">
          →
        </button>
      </div>
      {enlarged && <Lightbox src={enlarged.full || enlarged.src} alt={enlarged.alt} onClose={() => setEnlarged(null)} />}
    </div>
  )
}
