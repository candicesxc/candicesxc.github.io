import { useState } from 'react'

export default function Loader() {
  const [phase, setPhase] = useState('loading')
  if (phase === 'gone') return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-bg px-6 transition-opacity duration-500 ${
        phase === 'done' ? 'pointer-events-none opacity-0' : ''
      }`}
      onTransitionEnd={() => setPhase('gone')}
    >
      <div className="label text-center">unwrapping one sweet story 🍬</div>
      <div className="h-4 w-full max-w-xs overflow-hidden rounded-full border-[1.5px] border-ink bg-card">
        <div
          className="h-full origin-left bg-pop"
          style={{ animation: 'loader-fill 1.1s cubic-bezier(0.6, 0, 0.2, 1) forwards' }}
          onAnimationEnd={() => setPhase('done')}
        />
      </div>
    </div>
  )
}
