import { useRef } from 'react'
import BrowserFrame from '../components/BrowserFrame'
import FlipCard from '../components/FlipCard'
import PhotoBar from '../components/PhotoBar'
import StagePill from '../components/StagePill'
import WorldMap from '../components/WorldMap'
import useSeen from '../lib/useSeen'

// Turns "a **key fact** and a [link](https://…)" into text with the fact in red and a real link.
function Marked({ text }) {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <span key={i} className="text-pop">
          {part.slice(2, -2)}
        </span>
      )
    }
    const link = part.match(/^\[(.+?)\]\((.+?)\)$/)
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pop underline decoration-2 underline-offset-4"
        >
          {link[1]}
        </a>
      )
    }
    return part
  })
}

// A funnel stage told as a few sentences plus either a sideways strip of images or a flip card.
export default function StoryStage({ stage }) {
  const root = useRef(null)
  // Same type size on every stage; longer copy only steps down on phones, where height is tight.
  const dense = stage.lines.join(' ').length > 240
  const size = dense
    ? 'text-[min(1.3rem,2.4svh)] md:text-[min(1.9rem,3.4svh)] [@media(max-height:740px)]:text-[2.35svh] md:[@media(max-height:740px)]:text-[3.2svh]'
    : 'text-[min(1.3rem,2.6svh)] md:text-[min(1.9rem,3.4svh)]'

  // The sentences fade up once, one after another, when the stage first comes on screen,
  // and always finish fully solid. (A scroll-linked fade can't be used here: each stage is
  // exactly one screen, so the lower lines would never scroll far enough to finish.)
  const seen = useSeen(root, 0.35)

  const copy = (
    <div
      className={`shrink-0 ${stage.browser ? 'max-w-[36rem]' : 'max-w-6xl'} ${
        stage.barMax || stage.flip || stage.browser ? 'space-y-[1.8svh]' : 'space-y-[1svh]'
      }`}
    >
      {stage.lines.map((line, i) => (
        <p
          key={line}
          data-line
          className={`stage-line font-display font-semibold leading-snug ${size} ${seen ? 'is-seen' : ''}`}
          style={{ transitionDelay: `${i * 140}ms` }}
        >
          <Marked text={line} />
        </p>
      ))}
    </div>
  )

  return (
    <section
      id={stage.id}
      ref={root}
      className={`screen relative flex flex-col justify-center px-6 pb-[var(--bar-space)] pt-20 md:px-16 md:pr-28 lg:px-24 lg:pr-32 ${
        stage.map ? 'md:pb-6' : 'md:pb-20'
      }`}
    >
      {stage.flip || stage.browser ? (
        // Copy on the left, flip card or browser window on the right; stacked on phones.
        <div
          className={`flex min-h-0 flex-1 flex-col md:flex-none md:flex-row md:items-center md:gap-12 lg:gap-20 ${
            // Phones: the same generous gap between the copy and the image on every stage.
            'gap-[5.5svh]'
          }`}
        >
          <div className="shrink-0 md:min-w-0 md:flex-1">
            <StagePill stage={stage} />
            {copy}
          </div>
          {stage.flip ? (
            <FlipCard front={stage.flip.front} back={stage.flip.back} className="flex-1 md:flex-none" />
          ) : (
            <BrowserFrame {...stage.browser} className="browser-side flex-1 md:aspect-[4/3] md:flex-none">
              <div className="relative flex h-full items-center justify-center bg-white p-3">
                {/* Faded snapshot of the page behind the button */}
                <img
                  src={stage.browser.shot}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-30"
                />
                <a
                  href={stage.browser.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label relative flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#0c0a08] bg-[#e4f222] px-5 font-medium text-[#0c0a08] shadow-[3px_3px_0_#0c0a08]"
                >
                  open {stage.browser.address} ↗
                </a>
              </div>
            </BrowserFrame>
          )}
        </div>
      ) : (
        <>
          <StagePill stage={stage} tight={stage.map} />
          {copy}
          {stage.photos && <PhotoBar
            photos={stage.photos}
            from={stage.bar?.[0]}
            to={stage.bar?.[1]}
            maxHeight={stage.barMax}
            fitDesktop={stage.fitDesktop}
            zoom={stage.zoom}
          />}
          {stage.map && (
            // The map gets every spare pixel. On phones it runs edge to edge and pans sideways.
            <>
              <WorldMap className="-mx-6 mt-[4.5svh] min-h-0 flex-1 md:mx-0 md:mt-[1.5svh] md:max-h-[720px]" />
              <p className="label mt-2 shrink-0 text-center text-muted md:hidden">← swipe the map →</p>
            </>
          )}
        </>
      )}
    </section>
  )
}
