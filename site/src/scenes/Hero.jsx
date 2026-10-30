import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROFILE } from '../content'
import FunnelCanvas from '../components/FunnelCanvas'
import MetricCounter from '../components/MetricCounter'
import { depth, sayHi, stillHere } from '../lib/metrics'
import { scrollToId } from '../lib/scroll'


const link = 'ink-link'

function Letters({ text, className = '', popUntil = 0 }) {
  return (
    <span className={`block whitespace-nowrap ${className}`} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} data-letter className={`inline-block will-change-transform ${i < popUntil ? 'text-pop' : ''}`}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const root = useRef(null)
  const copy = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Scrolling tips the greeting into the funnel, letter by letter.
      gsap.to(root.current.querySelectorAll('[data-letter]'), {
        yPercent: 140,
        rotate: (i) => (i % 2 ? 14 : -14),
        opacity: 0,
        stagger: { each: 0.03, from: 'center' },
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => mm.revert()
  }, [])

  return (
    <section id="top" ref={root} className="screen relative">
      {/* The candy pours through the whole screen behind everything, and thins out behind the copy */}
      <FunnelCanvas avoid={copy} />

      <div className="chapter relative z-10 min-h-[100svh] justify-between gap-5 md:!pb-6">
        <div ref={copy} className="md:max-w-[68%]">
          <h1
            className="giant text-[min(15.4vw,4.4rem)] md:text-[min(9.4vw,16svh,9.5rem)]"
            aria-label={`Hey! I'm ${PROFILE.first} ${PROFILE.last}.`}
          >
            <Letters text="Hey! I'm" popUntil={4} />
            <Letters text={`${PROFILE.first} ${PROFILE.last}.`} />
          </h1>
          <p className="mt-[clamp(1rem,3svh,2rem)] max-w-[30em] text-[clamp(1.3125rem,6.2vw,1.625rem)] leading-[1.34] [text-wrap:pretty] md:text-[clamp(1.5rem,3.8svh,2.125rem)] md:leading-[1.32]">
            I lead web marketing{' '}
            <a href="https://ramp.com" target="_blank" rel="noopener noreferrer" className={link}>
              @Ramp
            </a>
            . Before this, I was a <span className="whitespace-nowrap">full-stack</span> marketer across unicorns and big tech. Oh, and I'm a{' '}
            <a href="https://som.yale.edu/" target="_blank" rel="noopener noreferrer" className={link}>
              Yale MBA
            </a>
            .
          </p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2 md:max-w-2xl md:gap-3 [@media(max-height:640px)]:hidden">
            <MetricCounter label="scroll depth" format={depth} source="real" tilt={-1} />
            <MetricCounter label="chance you say hi" format={sayHi} source="made up" flourish=", rising" tilt={0.75} />
            <MetricCounter label="visitors still here" format={stillHere} source="made up" tilt={-0.5} />
          </div>

          {/* The "what next" cue, under the tiles */}
          <div className="mt-4 flex justify-center md:mt-5 md:justify-start">
            <button type="button" onClick={() => scrollToId('awareness')} className="btn btn-primary btn-lg scroll-cue">
              scroll to enter the funnel
              <span className="scroll-cue-arrow" aria-hidden="true">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
