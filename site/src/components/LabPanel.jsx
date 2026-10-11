import { useSyncExternalStore } from 'react'
import { getLab, replay, setHeat, subscribe } from '../lib/lab'
import { scrollToId } from '../lib/scroll'

function Row({ label, value, children }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-3">
      <div>
        <div className="label text-muted">{label}</div>
        <div className="text-lg leading-tight">{value}</div>
      </div>
      {children}
    </div>
  )
}

const btn =
  'label min-h-[40px] shrink-0 rounded-full border-[1.5px] border-ink px-3 font-medium transition-colors hover:bg-pop hover:text-bg disabled:opacity-50'

// The "analytics" toy box: live clicks, heatmap, session replay, A/B test, conversion.
export default function LabPanel({ open, onOpen, variant, onVariant }) {
  const lab = useSyncExternalStore(subscribe, getLab)

  return (
    <>
      <button
        type="button"
        onClick={() => onOpen(!open)}
        aria-expanded={open}
        className="label fixed bottom-5 right-5 z-30 hidden min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-4 font-medium shadow-[3px_3px_0_var(--ink)] md:flex"
      >
        <span className="h-2 w-2 rounded-full bg-pop" style={{ animation: 'pulse-dot 1.4s ease-in-out infinite' }} />
        analytics · {lab.clicks} clicks
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Candice analytics"
          className="panel fixed inset-x-4 bottom-[92px] z-30 px-4 pb-1 pt-3 md:inset-x-auto md:bottom-20 md:right-5 md:w-80"
        >
          <div className="flex items-center justify-between pb-2">
            <span className="label font-medium">candice analytics</span>
            <button type="button" onClick={() => onOpen(false)} aria-label="Close" className="label h-10 w-10">
              ✕
            </button>
          </div>
          <Row label="clicks this session" value={lab.clicks} />
          <Row label="heatmap" value={lab.heat ? 'showing where you’ve been' : 'off'}>
            <button type="button" className={btn} aria-pressed={lab.heat} onClick={() => setHeat(!lab.heat)}>
              {lab.heat ? 'hide' : 'show'}
            </button>
          </Row>
          <Row label="session replay" value={lab.replaying ? 'playing…' : 'watch yourself browse'}>
            <button
              type="button"
              className={btn}
              disabled={lab.replaying}
              onClick={() => {
                if (replay()) onOpen(false)
              }}
            >
              ▶ play
            </button>
          </Row>
          <Row label="a/b test" value={`you’re in variant ${variant.toUpperCase()}`}>
            <button type="button" className={btn} onClick={() => onVariant(variant === 'a' ? 'b' : 'a')}>
              try {variant === 'a' ? 'B' : 'A'}
            </button>
          </Row>
          <Row label="conversion" value={lab.converted ? 'converted ✓' : 'not yet'}>
            <button
              type="button"
              className={btn}
              onClick={() => {
                onOpen(false)
                scrollToId('contact')
              }}
            >
              say hi
            </button>
          </Row>
        </div>
      )}
    </>
  )
}
