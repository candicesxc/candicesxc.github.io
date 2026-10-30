import { useRef } from 'react'
import BrowserFrame from '../components/BrowserFrame'
import FlipCard from '../components/FlipCard'
import PhotoBar from '../components/PhotoBar'
import StagePill from '../components/StagePill'
import WorkExample from '../components/WorkExample'
import WorldMap from '../components/WorldMap'
import useSeen from '../lib/useSeen'

// Turns "a **key fact** and a [link](https://…)" into text with the fact in red and a real link.
function Marked({ text }) {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <span key={i} className="mark">
          {part.slice(2, -2)}
        </span>
      )
    }
    const link = part.match(/^\[(.+?)\]\((.+?)\)$/)
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="ink-link">
          {link[1]}
        </a>
      )
    }
    return part
  })
}

// A funnel stage: the same label and text start on every chapter, then a strip of images,
// a map, or an image beside the text.
export default function StoryStage({ stage }) {
  const root = useRef(null)
  const split = stage.flip || stage.browser

  // The sentences fade up once, one after another, when the stage first comes on screen,
  // and always finish fully solid.
  const seen = useSeen(root, 0.2)

  const copy = (
    <div className={`story shrink-0 ${split ? 'story-side' : ''}`}>
      {stage.lines.map((line, i) => (
        <p key={line} data-line className={`stage-line ${seen ? 'is-seen' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
          <Marked text={line} />
        </p>
      ))}
    </div>
  )

  return (
    <section id={stage.id} ref={root} className="screen chapter justify-center">
      {split ? (
        // Label and copy on the left, flip card or browser window on the right, all starting
        // on the same line as every other chapter's label. Stacked on phones.
        <div className="chapter-split">
          <div className="min-w-0 md:flex-1">
            <StagePill stage={stage} />
            {copy}
            {stage.work && <WorkExample work={stage.work} />}
          </div>
          {stage.flip ? (
            <FlipCard front={stage.flip.front} back={stage.flip.back} />
          ) : (
            <BrowserFrame {...stage.browser} className="browser-side">
              <div className="relative flex h-full items-end justify-center bg-white p-4">
                {/* Faded snapshot of the page behind the button */}
                <img
                  src={stage.browser.shot}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-40"
                />
                <a
                  href={stage.browser.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn relative !border-[#0c0a08] !bg-[#e4f222] !text-[#0c0a08] [--shadow:#0c0a08]"
                >
                  open {stage.browser.address} ↗
                </a>
              </div>
            </BrowserFrame>
          )}
        </div>
      ) : (
        <>
          <StagePill stage={stage} />
          {copy}
          {stage.photos && <PhotoBar photos={stage.photos} from={stage.bar?.[0]} to={stage.bar?.[1]} samples={stage.samples} />}
          {stage.map && (
            // The map gets the spare room. On phones it runs edge to edge and pans sideways.
            <>
              <WorldMap className="-mx-[var(--gutter)] mt-[clamp(1rem,3svh,2rem)] h-[min(56svh,420px)] shrink-0 md:mx-0 md:h-[clamp(16rem,calc(100svh-25.5rem),800px)]" />
              <p className="label mt-2 shrink-0 text-center text-muted">
                <span className="md:hidden">swipe the map · </span>
                <span className="hidden md:inline">click </span>
                <span className="md:hidden">tap </span>a photo to open it
              </p>
            </>
          )}
        </>
      )}
    </section>
  )
}
