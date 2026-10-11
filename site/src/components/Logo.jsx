import { scrollToId } from '../lib/scroll'

// The candy mark doubles as the favicon (public/favicon.svg); keep the two in sync.
export function CandyMark({ size = 30 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <g transform="rotate(-18 16 16)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M11 16 2.5 9.5v13Z" fill="#669bbc" />
        <path d="M21 16l8.5-6.5v13Z" fill="#669bbc" />
        <circle cx="16" cy="16" r="9" fill="#c1121f" />
        <path
          d="M18.7 12.8a4.2 4.2 0 1 0 0 6.4"
          fill="none"
          stroke="#fdf0d5"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function Logo() {
  return (
    <button
      type="button"
      onClick={() => scrollToId('top')}
      aria-label="Candice Shen, back to top"
      className="group flex min-h-[44px] items-center gap-1.5"
    >
      <span className="transition-transform duration-300 group-hover:rotate-[24deg]">
        <CandyMark size={32} />
      </span>
      <span className="flex items-baseline gap-1 leading-none max-[349px]:hidden">
        <span className="font-display text-[1.1rem] font-extrabold lowercase tracking-tight sm:text-[1.35rem]">candice</span>
        <span className="font-script text-[1.1rem] lowercase text-pop sm:text-[1.35rem]">shen</span>
      </span>
    </button>
  )
}
