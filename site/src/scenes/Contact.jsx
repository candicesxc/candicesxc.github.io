import { useEffect, useRef, useState } from 'react'
import MetricCounter from '../components/MetricCounter'
import StagePill from '../components/StagePill'
import { FUNNEL, PROFILE } from '../content'
import { convert } from '../lib/lab'
import { depth, sayHi } from '../lib/metrics'

// Larger than the stage copy on phones, where this screen has room to spare.
const stage = FUNNEL.find((s) => s.id === 'contact')
const para = 'font-display font-semibold leading-snug text-[min(6.4vw,3.2svh,1.7rem)] md:text-[min(1.9rem,3.4svh)]'

export default function Contact() {
  const root = useRef(null)
  // The stat tiles and link buttons wait off-stage until the section is on screen, then come in one by one.
  const [seen, setSeen] = useState(false)
  const links = [
    { label: 'linkedin', href: PROFILE.linkedin },
    { label: 'email', href: `mailto:${PROFILE.email}` },
    { label: 'github', href: PROFILE.github },
  ]

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.5 })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])

  // Laid out like the first screen: copy top-left, stat tiles bottom-left in the very
  // same spot, so they read as the first screen's tiles having fallen all the way down.
  return (
    <section id="contact" ref={root} className="screen relative">
      <div className="flex h-full flex-col justify-between gap-4 px-6 pb-24 pt-20 md:px-16 md:pb-32 md:pr-28 lg:px-24 lg:pr-32">
        <div className="md:max-w-[70%]">
          <StagePill stage={stage} tight />
          <h2 className="giant text-[min(14.5vw,9svh,4rem)] md:text-[min(9.4vw,14svh,9.5rem)]">
            Say <span className="text-pop">hi</span>
          </h2>
          <div className="mt-[2.5svh] max-w-3xl space-y-[1.5svh] md:mt-[3svh] md:space-y-[1.8svh]">
            <p className={para}>Please reach out if there's anything I could help, or you just wanted to chat.</p>
            <p className={para}>No MBA-style (no) coffee (fake) chat though.</p>
          </div>
          <div className="mt-[3.5svh] flex flex-wrap gap-2.5 md:gap-5">
            {links.map((l, i) => (
              // Outer span pops in; inner link keeps dancing. Hovering a button holds it still.
              <span key={l.label} className={`say-pop ${seen ? 'is-in' : ''}`} style={{ '--i': i }}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={convert}
                  className="say-dance label flex min-h-[46px] items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-card px-4 font-medium shadow-[3px_3px_0_var(--ink)] hover:bg-pop hover:text-bg md:min-h-[56px] md:gap-2 md:px-9 md:text-[13px] md:shadow-[4px_4px_0_var(--ink)]"
                >
                  <span>{l.label}</span>
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              </span>
            ))}
          </div>
          <p className="label mt-[2.5svh] text-muted md:hidden [@media(max-height:700px)]:hidden">© {new Date().getFullYear()} candice shen</p>
        </div>

        {/* Same grid, in the same spot, as the first screen's tiles; they fall in from the top */}
        <div>
          <div className="grid grid-cols-3 gap-2 md:max-w-3xl md:gap-4">
          {[
            { label: 'scroll depth', format: depth, tilt: -1.5 },
            { label: 'chance you say hi', format: sayHi, delta: 'love ya!', tilt: 1 },
            { label: 'visitors still here', text: 'my bestie', tilt: -0.5 },
          ].map((m, i) => (
            <div key={m.label} className={`stat-drop ${seen ? 'is-in' : ''}`} style={{ '--i': i }}>
              <MetricCounter {...m} className="h-full" />
            </div>
          ))}
          </div>
        </div>
      </div>
      <p className="label absolute bottom-7 left-16 hidden text-muted md:block lg:left-24">
        © {new Date().getFullYear()} candice shen
      </p>
    </section>
  )
}
