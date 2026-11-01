import { useRef } from 'react'
import FunnelCanvas from '../components/FunnelCanvas'
import MetricCounter from '../components/MetricCounter'
import StagePill from '../components/StagePill'
import { FUNNEL, PROFILE } from '../content'
import { convert } from '../lib/lab'
import { depth, sayHi } from '../lib/metrics'
import useSeen from '../lib/useSeen'

const stage = FUNNEL.find((s) => s.id === 'contact')

export default function Contact() {
  const root = useRef(null)
  const copy = useRef(null)
  // The stat tiles and link buttons wait off-stage until the section is on screen, then come in one by one.
  const seen = useSeen(root, 0.3)
  const links = [
    { label: 'linkedin', href: PROFILE.linkedin, primary: true },
    { label: 'email', href: `mailto:${PROFILE.email}` },
    { label: 'github', href: PROFILE.github },
  ]

  // Laid out like the first screen: copy top-left, stat tiles bottom-left in the very
  // same spot, so they read as the first screen's tiles having fallen all the way down.
  return (
    <section id="contact" ref={root} className="screen chapter justify-between gap-6">
      {/* The candy that started pouring on the first screen is still going on the last */}
      <FunnelCanvas avoid={copy} />
      <div ref={copy} className="relative z-10 w-fit max-w-full">
        <StagePill stage={stage} />
        <h2 className="giant giant-3d title">
          Say <span className="giant-3d-pop">hi</span>
        </h2>
        <div className="story mt-[clamp(0.75rem,2.5svh,1.5rem)]">
          <p>Please reach out if there's anything I could help, or you just wanted to chat.</p>
          <p>No MBA-style (no) coffee (fake) chat though.</p>
        </div>
        <div className="mt-[clamp(1.25rem,3.5svh,2rem)] flex flex-wrap gap-3 md:gap-4">
          {links.map((l, i) => (
            // Outer span pops in; the link inside waves twice, then waits.
            <span key={l.label} className={`say-pop ${seen ? 'is-in' : ''}`} style={{ '--i': i }}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={convert}
                className={`btn btn-lg say-dance max-md:!px-4 ${l.primary ? 'btn-primary' : ''}`}
              >
                <span>{l.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Same grid, in the same spot, as the first screen's tiles; they fall in from the top */}
      <div className="relative z-10">
        <div className="grid grid-cols-3 gap-2 md:max-w-2xl md:gap-3">
          {[
            { label: 'scroll depth', format: depth, source: 'live', flourish: ' from this visit', tilt: -1 },
            { label: 'chance you say hi', format: sayHi, source: 'optimistic forecast', tilt: 0.75 },
            { label: 'visitors still here', text: 'my bestie', source: 'unaudited', tilt: -0.5 },
          ].map((m, i) => (
            <div key={m.label} className={`stat-drop ${seen ? 'is-in' : ''}`} style={{ '--i': i }}>
              <MetricCounter {...m} className="h-full" />
            </div>
          ))}
        </div>
        <p className="label mt-4 text-muted">© {new Date().getFullYear()} candice shen</p>
      </div>
    </section>
  )
}
