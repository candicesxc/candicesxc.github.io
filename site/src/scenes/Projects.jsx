import { useState } from 'react'
import { FUNNEL, PROJECTS } from '../content'
import ProjectModal from '../components/ProjectModal'
import StagePill from '../components/StagePill'

const TILTS = [-1.5, 1, -0.75]
const stop = (e) => e.stopPropagation()
const stage = FUNNEL.find((s) => s.id === 'projects')

// Side projects. Clicking a card opens its full description; the two buttons go straight out.
export default function Projects() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="projects"
      className="screen relative flex flex-col justify-center px-6 pb-24 pt-20 md:px-16 md:pb-20 md:pr-28 lg:px-24 lg:pr-32"
    >
      <StagePill stage={stage} tight />
      <h2 className="giant shrink-0 text-[min(11vw,9svh,6rem)]">Side projects</h2>

      <div className="photo-strip -mx-6 mt-[3svh] flex max-h-[580px] min-h-0 flex-1 snap-x gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            role="button"
            tabIndex={0}
            aria-label={`${p.title}: read more`}
            onClick={() => setOpen(p)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget && setOpen(p)}
            className="panel flex h-full w-[78vw] shrink-0 cursor-pointer snap-center flex-col overflow-hidden transition-transform duration-300 md:w-auto md:[transform:rotate(var(--tilt))] md:hover:[transform:rotate(0deg)_translateY(-4px)]"
            style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
          >
            <div className="min-h-0 flex-1 border-b-[1.5px] border-ink" style={{ background: p.imageBg }}>
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className={`h-full w-full ${p.contain ? `object-contain ${p.contain}` : 'object-cover'}`}
              />
            </div>
            <div className="flex shrink-0 flex-col gap-2 p-4">
              <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="leading-snug text-muted">{p.line}</p>
              <div className="label flex items-center gap-2 pt-1">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  className="flex min-h-[40px] items-center whitespace-nowrap rounded-full border-[1.5px] border-ink bg-pop px-3 font-medium text-bg"
                >
                  try it ↗
                </a>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  className="flex min-h-[40px] items-center whitespace-nowrap rounded-full border-[1.5px] border-ink px-3"
                >
                  code ↗
                </a>
                <span className="ml-auto whitespace-nowrap text-muted" aria-hidden="true">
                  more +
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
