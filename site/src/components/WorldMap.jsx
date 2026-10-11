import { useEffect, useRef, useState } from 'react'
import map from '../data/world-map.json'
import { burst } from '../lib/lab'
import Lightbox from './Lightbox'

const PHOTO_R = 13
const byId = Object.fromEntries(map.pins.filter((p) => p.id).map((p) => [p.id, p]))

// World map with visited countries lit up. They switch on one after another when the
// map scrolls into view; hover or tap a country or dot to see its name. Places with a
// photo get a round thumbnail on a short leader line; clicking it opens the picture.
export default function WorldMap({ className = '' }) {
  const pan = useRef(null)
  const box = useRef(null)
  const [lit, setLit] = useState(false)
  const [tip, setTip] = useState(null)
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLit(true), { threshold: 0.4 })
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  // Phones: open the sideways pan on the middle of the map. The map's width depends on
  // the space it is given, which can settle after first paint (fonts, the browser's
  // toolbar), so keep re-centring on every size change until the visitor touches it.
  useEffect(() => {
    const el = pan.current
    let touched = false
    const centre = () => {
      if (!touched) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    }
    const stop = () => {
      touched = true
    }
    const ro = new ResizeObserver(centre)
    ro.observe(el)
    ro.observe(box.current)
    el.addEventListener('pointerdown', stop, { passive: true })
    el.addEventListener('touchstart', stop, { passive: true })
    el.addEventListener('wheel', stop, { passive: true })
    centre()
    return () => {
      ro.disconnect()
      el.removeEventListener('pointerdown', stop)
      el.removeEventListener('touchstart', stop)
      el.removeEventListener('wheel', stop)
    }
  }, [])

  // Place the label over the pin, measured on screen so it stays right at any map size.
  // `key` tells a photo thumbnail apart from the country dot of the same name.
  const show = (pin, key = pin.name) => {
    const dot = box.current.querySelector(`[data-pin="${CSS.escape(key)}"]`)
    if (!dot) return
    const d = dot.getBoundingClientRect()
    const b = box.current.getBoundingClientRect()
    setTip({ pin, x: d.left + d.width / 2 - b.left, y: d.top - b.top })
  }
  const hide = () => setTip(null)
  const poke = (pin) => (e) => {
    show(pin)
    burst(e.clientX, e.clientY)
  }

  let order = 0
  return (
    <div ref={pan} className={`photo-strip overflow-x-auto overflow-y-hidden md:overflow-visible ${className}`}>
      <div
        ref={box}
        className="relative mx-auto aspect-[2/1] h-full md:aspect-auto md:w-full"
        onPointerLeave={hide}
      >
      <svg
        viewBox={`0 0 ${map.width} ${map.height}`}
        className="h-full w-full"
        role="group"
        aria-label={`World map with the countries Candice has visited lit up: ${map.pins
          .filter((p) => p.kind === 'country')
          .map((p) => p.name)
          .join(', ')}`}
      >
        <defs>
          {map.photos.map((p, i) => (
            <clipPath key={p.name} id={`map-photo-${i}`}>
              <circle cx={p.cxy[0]} cy={p.cxy[1]} r={PHOTO_R} />
            </clipPath>
          ))}
        </defs>

        {map.countries.map((c) => {
          const pin = c.on && byId[c.id]
          return (
            <path
              key={c.id + c.name}
              d={c.d}
              className={`map-land ${c.on ? 'map-on' : ''} ${c.on && lit ? 'is-lit' : ''}`}
              style={c.on ? { transitionDelay: `${order++ * 70}ms` } : undefined}
              {...(pin && { onPointerEnter: () => show(pin), onClick: poke(pin) })}
            />
          )
        })}

        {map.pins.map((p, i) => (
          <g
            key={p.name}
            className={`map-pin ${lit ? 'is-lit' : ''}`}
            style={{ transitionDelay: `${400 + i * 60}ms` }}
            onPointerEnter={() => show(p)}
            onClick={poke(p)}
          >
            {/* Invisible, larger circle so small pins are easy to hit */}
            <circle cx={p.xy[0]} cy={p.xy[1]} r="9" fill="transparent" />
            <circle data-pin={p.name} cx={p.xy[0]} cy={p.xy[1]} r="3.2" className="map-dot" />
          </g>
        ))}

        {map.photos.map((p, i) => {
          const r = PHOTO_R
          return (
            <g
              key={p.name}
              className={`map-pin map-photo ${lit ? 'is-lit' : ''}`}
              style={{ transitionDelay: `${1400 + i * 90}ms` }}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${p.name}`}
              onPointerEnter={() => show(p, `photo:${p.name}`)}
              onClick={() => setOpen(p)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(p)}
            >
              <line x1={p.xy[0]} y1={p.xy[1]} x2={p.cxy[0]} y2={p.cxy[1]} className="map-line" />
              <circle cx={p.xy[0]} cy={p.xy[1]} r="3.2" className="map-anchor" />
              <circle cx={p.cxy[0]} cy={p.cxy[1]} r={r} className="map-ring" />
              <image
                href={p.thumb}
                x={p.cxy[0] - r}
                y={p.cxy[1] - r}
                width={r * 2}
                height={r * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#map-photo-${i})`}
              />
              <circle data-pin={`photo:${p.name}`} cx={p.cxy[0]} cy={p.cxy[1]} r={r} className="map-frame" />
            </g>
          )
        })}
      </svg>

      {tip && (
        <div
          className="label pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border-[1.5px] border-ink bg-card px-3 py-1.5 font-medium shadow-[2px_2px_0_var(--ink)]"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          {tip.pin.name}
        </div>
      )}

      {open && <Lightbox src={open.full} alt={`Candice in ${open.name}`} onClose={() => setOpen(null)} />}
      </div>
    </div>
  )
}
