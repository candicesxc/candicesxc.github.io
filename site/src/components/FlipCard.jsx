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
        }, 500)
      }, turns === 0 ? 900 : 2000)
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
    'absolute inset-0 h-full w-full rounded-[var(--r)] border-[1.5px] border-ink object-cover shadow-[var(--shadow-lg)] [backface-visibility:hidden]'
  const showing = flipped ? back : front

  return (
    <div className={`flex shrink-0 flex-col items-center gap-3 ${className}`}>
      <button
        ref={card}
        type="button"
        aria-pressed={flipped}
        aria-label={`Flip the photo. Now showing: ${showing.alt}`}
        onClick={() => {
          setAuto(false)
          setFlipped((f) => !f)
        }}
        className="flip-photo group relative cursor-pointer rounded-[var(--r)] [perspective:1400px]"
        style={shaking ? { animation: 'card-shake 0.5s ease-in-out' } : undefined}
      >
        <span
          className="relative block h-full w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${flipped ? 180 : 0}deg) rotate(${flipped ? -1.5 : 1.5}deg)` }}
        >
          <img src={front.src} alt="" draggable="false" className={face} />
          <img src={back.src} alt="" draggable="false" className={`${face} [transform:rotateY(180deg)]`} />
        </span>
        <span aria-hidden="true" className="corner-tag !bottom-3 !right-3 text-[15px] transition-transform duration-[260ms] group-hover:rotate-180">
          ↻
        </span>
      </button>
      <span className="note shrink-0 text-xl" aria-hidden="true">
        {flipped ? 'the real me' : 'the “adult” me'}
      </span>
    </div>
  )
}
