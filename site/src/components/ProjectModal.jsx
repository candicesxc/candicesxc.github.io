import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import CloseButton from './CloseButton'

const pill = 'label flex min-h-[44px] items-center rounded-full border-[1.5px] border-ink px-4 font-medium'

// Pop-up with the full story of one project: picture (or phone screenshots), description,
// tags, credits and links. Closes with the X, the Escape key, or a click on the backdrop.
export default function ProjectModal({ project, onClose }) {
  const close = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    close.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={project.title} className="fixed inset-0 z-[70]">
      <div
        onClick={onClose}
        className="flex h-full items-start justify-center overflow-y-auto overscroll-contain bg-[#00121c]/85 px-4 py-20 backdrop-blur-sm md:py-10"
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className="my-auto w-full max-w-3xl overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-card text-ink"
        >
          {project.screenshots ? (
            <div className="photo-strip flex justify-start gap-4 overflow-x-auto bg-[#12202c] px-5 py-6 md:justify-center">
              {project.screenshots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="h-64 w-auto shrink-0 rounded-[18px] md:h-72"
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
            {project.award && (
              <p className="label mb-3 w-fit rounded-full bg-[#f4a261] px-3 py-1.5 font-medium text-[#003049]">
                ★ {project.award}
              </p>
            )}
            <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{project.title}</h3>
            <div className="mt-4 space-y-3 text-lg leading-relaxed">
              {project.details.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            {project.team && (
              <p className="mt-4 text-muted">
                <span className="label">team</span> {project.team}
              </p>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="label rounded-full border border-line px-2.5 py-1 text-muted">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={`${pill} bg-pop text-bg`}>
                try it ↗
              </a>
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={pill}>
                code ↗
              </a>
            </div>
          </div>
        </article>
      </div>
      <CloseButton ref={close} onClick={onClose} className="absolute right-4 top-4 md:right-8 md:top-6" />
    </div>,
    document.body,
  )
}
