import { useEffect, useRef, useSyncExternalStore } from 'react'
import { getLab, replay, setHeat, subscribe } from '../lib/lab'
import { depth, sayHi, stillHere } from '../lib/metrics'
import { onProgress, reducedMotion, scrollToId } from '../lib/scroll'

function Row({ label, value, children }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-2.5">
      <div className="min-w-0">
        <div className="label text-muted">{label}</div>
        <div className="text-[1.0625rem] leading-tight">{value}</div>
      </div>
      {children}
    </div>
  )
}

function Group({ title, note, children }) {
  return (
    <section className="mt-2">
      <h3 className="font-display text-lg font-bold leading-tight">{title}</h3>
      <p className="mb-2 text-[0.9375rem] leading-snug text-muted">{note}</p>
      {children}
    </section>
  )
}

// The up-arrow that says "this opens"; it flips when the panel is open.
export function LabChevron({ open, className = '' }) {
  return (
    <span className={`lab-chev ${open ? 'is-open' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 7.5 6 4l3.5 3.5" />
      </svg>
    </span>
  )
}

const COLOUR = { a: 'cream', b: 'navy' }

// A number that follows the page scroll, without re-rendering React.
function Live({ format }) {
  const ref = useRef(null)
  useEffect(() => onProgress((v) => { if (ref.current) ref.current.textContent = format(v) }), [format])
  return <span ref={ref} className="tabular-nums" />
}

// The "analytics" toy box. It keeps real session activity and the jokes in separate groups.
// Not modal: the page stays usable. Escape or a click elsewhere closes it, and focus goes
// back to the button that opened it.
export default function LabPanel({ open, onOpen, variant, onVariant }) {
  const lab = useSyncExternalStore(subscribe, getLab)
  const panel = useRef(null)
  const still = reducedMotion()

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    panel.current?.querySelector('button')?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onOpen(false)
    const onDown = (e) => {
      if (!panel.current?.contains(e.target) && !e.target.closest?.('[data-lab-trigger]')) onOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, onOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => onOpen(!open)}
        aria-expanded={open}
        data-lab-trigger
        className="lab-open label fixed bottom-5 right-5 z-30 hidden min-h-[46px] items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-card pl-4 pr-2 font-medium shadow-[var(--shadow-md)] md:flex"
      >
        <span className="h-2 w-2 rounded-full bg-pop" />
        analytics · {lab.clicks} clicks
        <LabChevron open={open} className="h-7 w-7" />
      </button>

      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Candice analytics"
          className="panel dialog-in fixed inset-x-3 bottom-[calc(var(--bar-space)+0.5rem)] z-30 max-h-[calc(100svh-var(--bar-space)-var(--header-h)-1rem)] overflow-y-auto px-4 pb-2 pt-2 md:inset-x-auto md:bottom-20 md:right-5 md:max-h-[calc(100svh-6.5rem)] md:w-[22rem]"
        >
          <div className="flex items-center justify-between">
            <span className="label font-medium">candice analytics</span>
            <button type="button" onClick={() => onOpen(false)} aria-label="Close analytics" className="-mr-2 grid h-11 w-11 place-items-center rounded-full">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <Group title="Real, from this visit" note="Your clicks, cursor and scroll. It stays in this browser tab and vanishes when you leave.">
            <Row label="clicks this visit" value={lab.clicks} />
            <Row label="scroll depth" value={<Live format={depth} />} />
            <Row label="heatmap" value={lab.heat ? 'showing where you’ve been' : 'off'}>
              <button type="button" className="btn shrink-0" aria-pressed={lab.heat} onClick={() => setHeat(!lab.heat)}>
                {lab.heat ? 'hide' : 'show'}
              </button>
            </Row>
            <Row
              label="session replay"
              value={still ? 'off, to respect your motion settings' : lab.replaying ? 'playing…' : 'watch yourself browse'}
            >
              <button
                type="button"
                className="btn shrink-0"
                disabled={lab.replaying || still}
                onClick={() => {
                  if (replay()) onOpen(false)
                }}
              >
                ▶ play
              </button>
            </Row>
            <Row label="a/b test" value={`you’re in ${variant.toUpperCase()}, the ${COLOUR[variant]} one`}>
              <button type="button" className="btn shrink-0" onClick={() => onVariant(variant === 'a' ? 'b' : 'a')}>
                try {variant === 'a' ? 'B' : 'A'}
              </button>
            </Row>
            <Row label="conversion" value={lab.converted ? 'converted ✓' : 'not yet'}>
              <button
                type="button"
                className="btn btn-primary shrink-0"
                onClick={() => {
                  onOpen(false)
                  scrollToId('contact')
                }}
              >
                say hi
              </button>
            </Row>
          </Group>

          <Group title="Made up, with confidence" note="These are estimates in the sense that I estimated them. Warmly.">
            <Row label="chance you say hi" value={<Live format={sayHi} />} />
            <Row label="visitors still here" value={<Live format={stillHere} />} />
          </Group>
        </div>
      )}
    </>
  )
}
