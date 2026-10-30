import { useEffect, useState, useSyncExternalStore } from 'react'
import { LabChevron } from './LabPanel'
import { FUNNEL } from '../content'
import { scrollToId } from '../lib/scroll'
import { getLab, subscribe } from '../lib/lab'

// Shows which funnel stage is on screen: side rail on desktop, bottom bar on phone.
export default function FunnelProgress({ onOpenLab, labOpen }) {
  const [active, setActive] = useState(null)
  const { clicks } = useSyncExternalStore(subscribe, getLab)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? null : e.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    ;['top', ...FUNNEL.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const current = FUNNEL.find((s) => s.id === active)

  return (
    <>
      <nav
        aria-label="Funnel stages"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center md:flex"
      >
        {FUNNEL.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToId(s.id)}
            aria-label={`${s.n} ${s.name}`}
            aria-current={active === s.id ? 'step' : undefined}
            className="group relative flex h-6 items-center justify-center rounded-full"
            style={{ width: 56 }}
          >
            <span
              className="block h-3.5 rounded-full border-[1.5px] border-ink transition-[background-color,transform] duration-[260ms] group-hover:scale-y-125"
              style={{
                width: 56 - i * 7,
                background: active === s.id ? s.color : 'var(--card)',
              }}
            />
            <span className="label pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-card px-2.5 py-1 opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100 group-focus-visible:opacity-100">
              {s.n} {s.name}
            </span>
          </button>
        ))}
      </nav>

      <nav
        aria-label="Funnel stages"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg px-[var(--gutter)] pt-1 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="label flex h-9 items-center justify-between gap-2">
          <span className="truncate">{current ? `${current.n} ${current.name}` : '00 top of funnel'}</span>
          <button
            type="button"
            onClick={onOpenLab}
            aria-expanded={labOpen}
            aria-label={`Analytics: ${clicks} clicks`}
            data-lab-trigger
            className="label flex min-h-[44px] shrink-0 items-center font-medium"
          >
            <span className="lab-open flex h-7 items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-card pl-2.5 pr-1 shadow-[var(--shadow-sm)]">
              analytics · {clicks}
              <LabChevron open={labOpen} className="h-[20px] w-[20px]" />
            </span>
          </button>
        </div>
        {/* Thin to look at, a full fingertip to tap */}
        <div className="flex gap-1">
          {FUNNEL.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              aria-label={`${s.n} ${s.name}`}
              aria-current={active === s.id ? 'step' : undefined}
              className="flex h-11 flex-1 items-center"
            >
              <span
                className="block h-3.5 w-full rounded-full border-[1.5px] border-ink transition-colors duration-[260ms]"
                style={{ background: active === s.id ? s.color : 'var(--card)' }}
              />
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
