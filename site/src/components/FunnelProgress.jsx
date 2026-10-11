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
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-1.5 md:flex"
      >
        {FUNNEL.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToId(s.id)}
            aria-label={s.name}
            aria-current={active === s.id}
            className="group relative flex h-5 items-center justify-center"
            style={{ width: 56 }}
          >
            <span
              className="block h-3.5 rounded-full border-[1.5px] border-ink transition-all duration-300"
              style={{
                width: 56 - i * 7,
                background: active === s.id ? s.color : 'var(--card)',
              }}
            />
            <span
              className="label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-bg px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {s.n} {s.name}
            </span>
          </button>
        ))}
      </nav>

      <nav
        aria-label="Funnel stages"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 px-4 pt-2 backdrop-blur md:hidden"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="label mb-1.5 flex items-center justify-between">
          <span>{current ? `${current.n} ${current.name}` : '00 top of funnel'}</span>
          {/* A proper little button: outlined pill with an arrow that flips when open */}
          <button
            type="button"
            onClick={onOpenLab}
            aria-expanded={labOpen}
            className="label -my-2 flex min-h-[40px] items-center font-medium"
          >
            <span className="lab-open flex h-[26px] items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-card pl-2.5 pr-1 shadow-[2px_2px_0_var(--ink)]">
              analytics · {clicks} clicks
              <LabChevron open={labOpen} className="h-[18px] w-[18px]" />
            </span>
          </button>
        </div>
        <div className="flex gap-1">
          {FUNNEL.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              aria-label={s.name}
              className="h-4 flex-1 rounded-full border-[1.5px] border-ink transition-colors duration-300"
              style={{ background: active === s.id ? s.color : 'var(--card)' }}
            />
          ))}
        </div>
      </nav>
    </>
  )
}
