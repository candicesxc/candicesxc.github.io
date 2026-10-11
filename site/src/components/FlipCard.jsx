import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/scroll'

// A photo that flips to show a second one on its back. While on screen it waits,
// shakes as if about to tip over, then flips by itself: once to the back, once
// to the front again, then it rests. A click flips it too and hands control to the visitor.
export default function FlipCard({ front, back, className = '' }) {
  const card = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const [auto, setAuto] = useState(() => !reducedMotion())
  const [shaking, setShaking] = useState(false)

  useEffect(() => {
    if (!auto) return
    let wait = 0
    let shake = 0
    let turns = 0
    const cycle = () => {
      if (turns >= 2) return setAuto(false)
      wait = setTimeout(() => {
        setShaking(true)
        shake = setTimeout(() => {
          setShaking(false)
          // Count real flips, so a restart (scrolling away and back) never eats one.
          turns += 1
          setFlipped(turns === 1)
          cycle()
        }, 700)
      }, turns === 0 ? 1000 : 2200)
    }
    const stop = () => {
      clearTimeout(wait)
      clearTimeout(shake)
      setShaking(false)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        stop()
        if (e.isIntersecting) cycle()
      },
      { threshold: 0.6 },
    )
    io.observe(card.current)
    return () => {
      stop()
      io.disconnect()
    }
  }, [auto])

  const face =
    'absolute inset-0 h-full w-full rounded-[22px] border-[1.5px] border-ink object-cover shadow-[5px_5px_0_var(--ink)] [backface-visibility:hidden]'

  return (
    <div className={`flex min-h-0 flex-col items-center gap-2 ${className}`}>
      <button
        ref={card}
        type="button"
        aria-pressed={flipped}
        aria-label="Flip the photo"
        onClick={() => {
          setAuto(false)
          setFlipped((f) => !f)
        }}
        className="aspect-[2/3] min-h-0 flex-1 cursor-pointer [perspective:1400px] md:h-[min(62svh,540px)] md:flex-none"
        style={shaking ? { animation: 'card-shake 0.7s ease-in-out' } : undefined}
      >
        <span
          className="relative block h-full w-full transition-transform duration-[1200ms] ease-in-out [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${flipped ? 180 : 0}deg) rotate(${flipped ? -2 : 2}deg)` }}
        >
          <img src={front.src} alt={front.alt} draggable="false" className={face} />
          <img
            src={back.src}
            alt={back.alt}
            draggable="false"
            className={`${face} [transform:rotateY(180deg)]`}
          />
        </span>
      </button>
      <span className="note shrink-0 text-lg md:text-xl" aria-hidden="true">
        {flipped ? 'the real me ↻' : 'the “adult” me ↻'}
      </span>
    </div>
  )
}
