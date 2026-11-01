import { createPortal } from 'react-dom'
import CloseButton from './CloseButton'
import useDialog from '../lib/useDialog'

function Section({ label, children }) {
  return (
    <section className="mt-5 border-t border-line pt-4">
      <h4 className="label text-muted">{label}</h4>
      <div className="mt-2">{children}</div>
    </section>
  )
}

// Pop-up with the full story of one project: picture (or phone screenshots), the idea, how
// it works, what it's built with, and links. Closes with the X, the Escape key, or a click
// on the backdrop.
export default function ProjectModal({ project, onClose }) {
  const dialog = useDialog(onClose)

  return createPortal(
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={project.title} className="fixed inset-0 z-[70]">
      <CloseButton onClick={onClose} className="absolute right-4 top-4 z-10 md:right-8 md:top-6" />
      <div
        onClick={onClose}
        className="flex h-full items-start justify-center overflow-y-auto overscroll-contain bg-[#00121c]/85 px-4 py-20 backdrop-blur-sm md:py-10"
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className="dialog-in my-auto w-full max-w-3xl overflow-hidden rounded-[var(--r)] border-[1.5px] border-ink bg-card text-ink"
        >
          {project.screenshots ? (
            <div className="photo-strip flex justify-start gap-4 overflow-x-auto bg-[#12202c] px-5 py-6 md:justify-center">
              {project.screenshots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="h-64 w-auto shrink-0 rounded-[var(--r-sm)] md:h-72"
                />
              ))}
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full border-b-[1.5px] border-ink"
              style={{ background: project.imageBg }}
            />
          )}

          <div className="p-5 md:p-8">
            <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{project.title}</h3>
            <p className="mt-3 text-lg font-medium leading-snug md:text-xl">{project.idea}</p>

            <Section label="how it works">
              <ul className="list-disc space-y-2 pl-5 text-[1.0625rem] leading-snug marker:text-pop">
                {project.how.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>

            {project.team && (
              <Section label="team">
                <p className="text-[1.0625rem]">{project.team}</p>
              </Section>
            )}

            <Section label="built with">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="label rounded-full border border-line px-2.5 py-1 text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                try it ↗
              </a>
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn">
                view code ↗
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>,
    document.body,
  )
}
