import { useEffect, useState } from 'react'
import { STAGES } from './content'
import { initScroll, scrollToId } from './lib/scroll'
import ABToggle from './components/ABToggle'
import FunnelProgress from './components/FunnelProgress'
import HeatTrail from './components/HeatTrail'
import Loader from './components/Loader'
import Hero from './scenes/Hero'
import StageStub from './scenes/StageStub'
import StoryStage from './scenes/StoryStage'
import Projects from './scenes/Projects'
import Contact from './scenes/Contact'
import { initLab } from './lib/lab'
import LabPanel from './components/LabPanel'
import Logo from './components/Logo'

const KEY = 'funnel-variant'

// A real coin flip on first visit, then remembered.
function initialVariant() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'a' || saved === 'b') return saved
  } catch {}
  return Math.random() < 0.5 ? 'a' : 'b'
}

export default function App() {
  const [variant, setVariant] = useState(initialVariant)
  const [labOpen, setLabOpen] = useState(false)
  // Wiggle the A/B switch until the visitor has tried it once.
  const [nudge, setNudge] = useState(() => {
    try {
      return !localStorage.getItem('funnel-toggled')
    } catch {
      return true
    }
  })
  const switchVariant = (v) => {
    setVariant(v)
    setNudge(false)
    try {
      localStorage.setItem('funnel-toggled', '1')
    } catch {}
  }

  useEffect(() => {
    document.documentElement.dataset.variant = variant
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', variant === 'b' ? '#003049' : '#fdf0d5')
    try {
      localStorage.setItem(KEY, variant)
    } catch {}
  }, [variant])

  useEffect(() => initScroll(), [])
  useEffect(() => initLab(), [])

  return (
    <>
      <Loader />
      <HeatTrail />

      <header className="fixed inset-x-0 top-0 z-30 flex h-[var(--header-h)] items-center justify-between bg-bg pl-[var(--gutter)] pr-[var(--gutter)] md:pr-5">
        <Logo />
        <nav aria-label="Site" className="flex items-center gap-2 md:gap-3">
          <button type="button" onClick={() => scrollToId('projects')} className="btn group max-sm:!px-3">
            projects
            <span aria-hidden="true" className="hidden transition-transform duration-[140ms] group-hover:translate-y-0.5 sm:inline">
              ↓
            </span>
          </button>
          <ABToggle variant={variant} onChange={switchVariant} nudge={nudge} />
        </nav>
      </header>

      <main className="page relative z-10">
        <Hero />
        {STAGES.map((s) =>
          s.lines ? <StoryStage key={s.id} stage={s} /> : <StageStub key={s.id} stage={s} />,
        )}
        <Projects />
        <Contact />
      </main>

      <FunnelProgress onOpenLab={() => setLabOpen((o) => !o)} labOpen={labOpen} />
      <LabPanel open={labOpen} onOpen={setLabOpen} variant={variant} onVariant={switchVariant} />
    </>
  )
}
