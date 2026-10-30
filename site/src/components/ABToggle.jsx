import { useEffect, useState } from 'react'
import { onProgress } from '../lib/scroll'

const NAMES = { a: 'cream', b: 'navy' }

// A real A/B test of the site's look: A is cream, B is navy, and a coin picked yours.
// A hint says what the switch does until it has been tried, or the visitor has moved on.
export default function ABToggle({ variant, onChange, nudge }) {
  const isB = variant === 'b'
  const other = isB ? 'a' : 'b'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!nudge) return
    return onProgress((p) => p > 0.02 && setScrolled(true))
  }, [nudge])

  return (
    <div className="relative">
      {nudge && !scrolled && (
        <span className="label pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-card px-2.5 py-1.5 font-medium shadow-[var(--shadow-sm)]">
          a/b test me: try {NAMES[other]}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isB}
        aria-label="A/B test: use the navy version of this site"
        title={`A/B test. You're in ${variant.toUpperCase()} (${NAMES[variant]}). Try ${other.toUpperCase()} (${NAMES[other]}).`}
        onClick={() => onChange(other)}
        className="relative flex h-11 w-[84px] items-center rounded-full border-[1.5px] border-ink bg-card p-[3px] transition-transform duration-[140ms] active:scale-[0.97]"
      >
        <span
          className={`absolute left-[3px] top-[3px] h-[35px] w-[37px] rounded-full bg-pop transition-transform duration-[260ms] ease-[cubic-bezier(0.22,0.8,0.36,1)] ${
            isB ? 'translate-x-[39px]' : ''
          }`}
          style={nudge ? { '--dir': isB ? -1 : 1, animation: 'wiggle 2.2s ease-in-out 1s 3' } : undefined}
        />
        {['a', 'b'].map((v) => (
          <span
            key={v}
            className={`label relative z-10 w-[39px] text-center font-medium transition-colors duration-[140ms] ${
              variant === v ? 'text-bg' : 'text-muted'
            }`}
          >
            {v}
          </span>
        ))}
      </button>
    </div>
  )
}
