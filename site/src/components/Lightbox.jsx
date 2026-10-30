import { createPortal } from 'react-dom'
import CloseButton from './CloseButton'
import useDialog from '../lib/useDialog'

function Fact({ label, children }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="label text-muted">{label}</dt>
      <dd className="mt-1 text-[1.0625rem] leading-snug">{children}</dd>
    </div>
  )
}

// Full-screen viewer for one image, with optional context. A plain `caption` sits under the
// image; a `sample` (a piece of past work) gets a panel saying what it is and what I did.
// Tall pieces scroll. Closes with the X, the Escape key, or a click on the dimmed backdrop.
export default function Lightbox({ src, alt, caption, sample, onClose }) {
  const dialog = useDialog(onClose)

  return createPortal(
    // The X lives outside the scrolling layer so it stays put while a tall piece scrolls.
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={sample ? `${sample.company}: ${sample.title}` : alt} className="fixed inset-0 z-[70]">
      <CloseButton onClick={onClose} className="absolute right-4 top-4 z-10 md:right-8 md:top-6" />
      <div
        onClick={onClose}
        className="flex h-full items-start justify-center overflow-y-auto overscroll-contain bg-[#00121c]/85 px-4 py-20 backdrop-blur-sm md:py-10"
      >
        {sample ? (
          <article
            onClick={(e) => e.stopPropagation()}
            className="dialog-in my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[var(--r)] border-[1.5px] border-ink bg-card text-ink md:max-h-[calc(100svh-5rem)] md:flex-row-reverse"
          >
            <div className="shrink-0 overflow-y-auto p-5 md:w-[21rem] md:p-7">
              <p className="label text-pop">{sample.company}</p>
              <h3 className="mt-1.5 pr-8 font-display text-[1.65rem] font-bold leading-tight md:pr-0">{sample.title}</h3>
              <dl className="mt-4 space-y-3">
                <Fact label="the piece">{sample.what}</Fact>
                <Fact label="what i did">{sample.did}</Fact>
                <Fact label={sample.resultLabel}>{sample.result}</Fact>
              </dl>
            </div>
            <div className="min-w-0 flex-1 overflow-y-auto border-t-[1.5px] border-ink bg-white md:border-r-[1.5px] md:border-t-0" tabIndex={0} aria-label="Scroll the full piece">
              <img src={src} alt={alt} className="h-auto w-full" />
            </div>
          </article>
        ) : (
          <figure onClick={(e) => e.stopPropagation()} className="dialog-in my-auto w-full max-w-3xl">
            <img src={src} alt={alt} className="h-auto w-full rounded-[var(--r)] border-[1.5px] border-[#003049] bg-white" />
            {caption && <figcaption className="label mt-3 text-center text-[#fdf0d5]">{caption}</figcaption>}
          </figure>
        )}
      </div>
    </div>,
    document.body,
  )
}
