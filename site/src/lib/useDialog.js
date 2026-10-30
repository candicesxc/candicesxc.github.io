import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not(:disabled), input, [tabindex]:not([tabindex="-1"])'

// Everything a pop-up owes the visitor: Escape closes it, Tab stays inside, the page behind
// holds still, and focus goes back to whatever opened it. Put the returned ref on the
// dialog; the first focusable element inside (the close button) receives focus.
export default function useDialog(onClose) {
  const ref = useRef(null)
  const latestClose = useRef(onClose)
  latestClose.current = onClose

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.overflow
    const opener = document.activeElement
    root.style.overflow = 'hidden'
    ref.current?.querySelector(FOCUSABLE)?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') return latestClose.current()
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!ref.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  return ref
}
