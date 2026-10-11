// Sliding switch that flips the whole site between Variant A (light) and Variant B (dark).
// While `nudge` is on, the knob wiggles toward the other side to invite a first try.
export default function ABToggle({ variant, onChange, nudge }) {
  const isB = variant === 'b'
  return (
    <div className="flex items-center gap-2">
      {nudge && (
        <span className="label hidden rounded-full bg-bg px-2 py-1 text-pop sm:inline" style={{ animation: 'pulse-dot 1.6s ease-in-out infinite' }}>
          a/b test me →
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isB}
        aria-label={`Variant ${variant.toUpperCase()}. Switch to variant ${isB ? 'A' : 'B'}`}
        onClick={() => onChange(isB ? 'a' : 'b')}
        className="relative flex h-10 w-[83px] items-center rounded-full border-[1.5px] border-ink bg-card p-0.5"
      >
        <span
          className={`absolute left-0.5 top-0.5 h-[33px] w-[38px] rounded-full bg-pop transition-transform duration-300 ${
            isB ? 'translate-x-[38px]' : ''
          }`}
          style={nudge ? { '--dir': isB ? -1 : 1, animation: 'wiggle 2.2s ease-in-out infinite' } : undefined}
        />
        {['a', 'b'].map((v) => (
          <span
            key={v}
            className={`label relative z-10 w-[38px] text-center font-medium transition-colors ${
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
