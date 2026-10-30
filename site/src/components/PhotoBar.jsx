import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/scroll'
import Lightbox from './Lightbox'

// Thumbnail plus caption for one piece of past work. The whole frame opens it.
function WorkCard({ piece, onOpen }) {
  const contain = piece.fit === 'contain'
  return (
    <figure className="panel work-card">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge ${piece.company}: ${piece.title}`}
        className="work-thumb"
        style={{ background: piece.matte || '#fff' }}
      >
        <img
          src={piece.src}
          alt=""
          loading="lazy"
          draggable="false"
          className={contain ? 'object-contain' : 'object-cover'}
          style={{ objectPosition: piece.focus }}
        />
        <span aria-hidden="true" className="corner-tag">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <figcaption className="flex flex-1 flex-col p-3.5">
        <span className="label text-pop">{piece.company}</span>
        <span className="mt-1 font-display text-[1.1875rem] font-bold leading-tight">{piece.title}</span>
        <span className="mt-1 text-[0.9375rem] leading-snug text-muted">{piece.caption}</span>
      </figcaption>
    </figure>
  )
}

// A sideways strip with a slider underneath: drag the knob, swipe the strip, or use the
// arrows to travel from `from` (left) to `to` (right). Photos drift left to right on their
// own until the visitor touches them. With `samples`, the strip holds captioned work cards
// instead: side by side on wide screens, with no slider, and each one opens with context.
export default function PhotoBar({ photos, from, to, samples }) {
  const strip = useRef(null)
  const [pos, setPos] = useState(0)
  const [auto, setAuto] = useState(() => !samples && !reducedMotion())
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
      // Sleep while off screen rather than ticking for nothing.
      if (visible) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }, { threshold: 0.5 })
    const tick = (now) => {
      if (last) x = Math.min(x + ((now - last) / 1000) * 24, max())
      last = now
      el.scrollLeft = x
      if (x >= max()) return setAuto(false)
      raf = requestAnimationFrame(tick)
    }
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [auto])

  const stop = () => setAuto(false)

  const nudge = (dir) => strip.current.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: reducedMotion() ? 'auto' : 'smooth' })

  return (
    <div
      onPointerDown={stop}
      onWheel={stop}
      onKeyDown={stop}
      onFocus={stop}
      onMouseEnter={stop}
      className="mt-[clamp(1.25rem,3.5svh,2.25rem)] flex shrink-0 flex-col"
    >
      <div
        ref={strip}
        tabIndex={samples ? undefined : 0}
        role="group"
        aria-label={samples ? 'Past work' : `Photos, from ${from} to ${to}`}
        className={`photo-strip -mx-[var(--gutter)] flex scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] py-2 md:mx-0 md:scroll-px-0 md:px-1 ${auto ? '' : 'snap-x'} ${
          samples ? 'work-grid pb-3' : 'photo-strip-photos box-content md:gap-5'
        }`}
      >
        {samples
          ? photos.map((p) => <WorkCard key={p.src} piece={p} onOpen={() => setEnlarged(p)} />)
          : photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Candice, photo ${i + 1} of ${photos.length}`}
                loading="lazy"
                draggable="false"
                className="aspect-square h-full w-auto shrink-0 snap-start rounded-[var(--r)] border-[1.5px] border-ink bg-card object-cover shadow-[var(--shadow-md)]"
                style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
              />
            ))}
        <span className={`w-1 shrink-0 ${samples ? 'md:hidden' : ''}`} aria-hidden="true" />
      </div>

      <div className={`mt-1 flex shrink-0 items-center gap-3 ${samples ? 'md:hidden' : ''}`}>
        <button type="button" onClick={() => nudge(-1)} aria-label={`Toward ${from}`} className="photo-arrow">
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
        <button type="button" onClick={() => nudge(1)} aria-label={`Toward ${to}`} className="photo-arrow">
          →
        </button>
      </div>
      {enlarged && (
        <Lightbox src={enlarged.full || enlarged.src} alt={enlarged.alt} sample={enlarged} onClose={() => setEnlarged(null)} />
      )}
    </div>
  )
}
