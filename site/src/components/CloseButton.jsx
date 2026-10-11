import { forwardRef } from 'react'

// Round close button with a drawn (not typed) cross, so it sits dead centre in every font.
const CloseButton = forwardRef(function CloseButton({ onClick, className = '' }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={`grid h-12 w-12 place-items-center rounded-full bg-[#fdf0d5] text-[#003049] shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  )
})

export default CloseButton
