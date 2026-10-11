import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROFILE } from '../content'
import FunnelCanvas from '../components/FunnelCanvas'
import MetricCounter from '../components/MetricCounter'
import { depth, sayHi, stillHere } from '../lib/metrics'
import { scrollToId } from '../lib/scroll'


const link = 'font-semibold text-pop underline decoration-2 underline-offset-4'

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
  const funnel = useRef(null)

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

  // Tell the funnel where the copy ends (as a share of the screen height) so its phone
  // fade can stay faint behind the text and turn solid right below it, on any phone.
  useEffect(() => {
    const measure = () => {
      const end = copy.current.getBoundingClientRect().bottom - root.current.getBoundingClientRect().top
      funnel.current.style.setProperty('--text-end', `${Math.round((end / root.current.offsetHeight) * 100)}%`)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(copy.current)
    ro.observe(root.current)
    measure()
    return () => ro.disconnect()
  }, [])

  return (
    <section id="top" ref={root} className="screen relative">
      <div className="relative z-10 flex h-full flex-col justify-between gap-3 px-6 pb-[var(--bar-space)] pt-20 md:gap-4 md:px-16 md:pb-32 md:pr-28 lg:px-24 lg:pr-32">
        <div ref={copy} className="md:max-w-[70%]">
          <h1
            className="giant text-[min(15.4vw,9.6svh,4.4rem)] md:text-[min(9.4vw,16svh,9.5rem)]"
            aria-label={`Hey! I'm ${PROFILE.first} ${PROFILE.last}.`}
          >
            <Letters text="Hey! I'm" popUntil={4} />
            <Letters text={`${PROFILE.first} ${PROFILE.last}.`} />
          </h1>
          <p className="mt-[2.5svh] max-w-3xl text-[min(7.4vw,3.6svh,1.95rem)] leading-[1.32] md:mt-[3svh] md:text-[min(2.4rem,4.4svh)] md:leading-snug">
            I lead web marketing{' '}
            <a href="https://ramp.com" target="_blank" rel="noopener noreferrer" className={link}>
              @Ramp
            </a>
            . Before this, I was a full-stack marketer across unicorns and big tech. Oh, and I'm a{' '}
            <a href="https://som.yale.edu/" target="_blank" rel="noopener noreferrer" className={link}>
              Yale MBA
            </a>
            .
          </p>
        </div>

        {/* The funnel fills the whole screen behind everything. On phones, where it runs
            straight through the copy, it stays faint behind the text and turns fully solid
            just below it (the --text-end set above), filling the open space. */}
        <div ref={funnel} className="hero-funnel absolute inset-0 -z-10">
          <FunnelCanvas />
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2 md:max-w-3xl md:gap-4 [@media(max-height:700px)]:hidden">
            <MetricCounter label="scroll depth" format={depth} tilt={-1.5} />
            <MetricCounter label="chance you say hi" format={sayHi} delta="↑ rising" tilt={1} />
            <MetricCounter label="visitors still here" format={stillHere} tilt={-0.5} />
          </div>

          {/* The "what next" cue: a bright, bobbing, pulsing pill at the bottom of the screen.
              Phones: in the flow under the tiles. Desktop: pinned bottom-centre, so the
              tiles keep their spot. The wrapper positions it; the button itself animates. */}
          <div className="mt-7 flex justify-center md:absolute md:inset-x-0 md:bottom-4 md:mt-0">
            <button type="button" onClick={() => scrollToId('awareness')} className="scroll-cue label">
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
