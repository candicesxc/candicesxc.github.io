import { forwardRef } from 'react'

// Round close button with a drawn (not typed) cross, so it sits dead centre in every font.
const CloseButton = forwardRef(function CloseButton({ onClick, className = '' }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={`btn !h-12 !w-12 !p-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  )
})

export default CloseButton
