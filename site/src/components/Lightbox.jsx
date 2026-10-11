import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import CloseButton from './CloseButton'

// Full-screen viewer for one image. Tall pieces scroll inside it.
// Closes with the X button, the Escape key, or a click on the dimmed backdrop.
export default function Lightbox({ src, alt, onClose }) {
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
    // The X lives outside the scrolling layer so it stays put while a tall piece scrolls.
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[70]">
      <div
        onClick={onClose}
        className="flex h-full items-start justify-center overflow-y-auto overscroll-contain bg-[#00121c]/85 px-4 py-20 backdrop-blur-sm md:py-10"
      >
        <img
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          className="my-auto h-auto w-full max-w-3xl rounded-[18px] border-[1.5px] border-[#003049] bg-white"
        />
      </div>
      <CloseButton ref={close} onClick={onClose} className="absolute right-4 top-4 md:right-8 md:top-6" />
    </div>,
    document.body,
  )
}
