import { useState } from 'react'
import { FUNNEL, PROJECTS } from '../content'
import ProjectModal from '../components/ProjectModal'
import StagePill from '../components/StagePill'

const stage = FUNNEL.find((s) => s.id === 'projects')

// Side projects. Each card has three clear exits: try the thing, read its code, or read more
// here. Clicking the rest of the card also reads more; the "read more" button is what
// keyboards and screen readers use, and it gets focus back when the pop-up closes.
export default function Projects() {
  const [open, setOpen] = useState(null)

  const cardClick = (e, p) => {
    if (e.target.closest('a, button')) return
    e.currentTarget.querySelector('[data-more]').focus({ preventScroll: true })
    setOpen(p)
  }

  return (
    <section id="projects" className="screen chapter justify-center">
      <StagePill stage={stage} />
      <h2 className="giant giant-3d title shrink-0">Side projects</h2>

      <div className="mt-[clamp(1rem,3svh,2rem)] grid gap-5 md:grid-cols-3 md:gap-6">
        {PROJECTS.map((p) => (
          <article key={p.title} onClick={(e) => cardClick(e, p)} className="panel group flex cursor-pointer flex-col overflow-hidden">
            <div className="aspect-[16/10] shrink-0 overflow-hidden border-b-[1.5px] border-ink md:aspect-auto md:h-[min(30svh,22rem)]" style={{ background: p.imageBg }}>
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className={`h-full w-full transition-transform duration-[260ms] group-hover:scale-[1.02] ${p.contain ? `object-contain ${p.contain}` : p.imageBg ? 'object-contain' : 'object-cover'}`}
                style={{ objectPosition: p.focus }}
              />
            </div>
            <div className="flex flex-1 flex-col p-4 md:p-5">
              <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-[1.0625rem] leading-snug text-muted">{p.line}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Try ${p.title}`} className="btn btn-primary !px-3.5">
                  try it ↗
                </a>
                <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`View the code for ${p.title}`} className="btn !px-3.5">
                  code ↗
                </a>
                <button type="button" data-more onClick={() => setOpen(p)} aria-label={`Read more about ${p.title}`} className="btn-text ml-auto">
                  read more
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
