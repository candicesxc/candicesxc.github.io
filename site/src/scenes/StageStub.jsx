import StagePill from '../components/StagePill'

// Placeholder for a funnel stage until its real scene is built.
export default function StageStub({ stage }) {
  return (
    <section
      id={stage.id}
      className="screen relative flex flex-col justify-center px-6 pb-24 pt-20 md:px-16 md:pb-20 md:pr-28 lg:px-24 lg:pr-32"
    >
      <StagePill stage={stage} />
      <p className="max-w-6xl shrink-0 font-display text-[min(1.3rem,2.6svh)] font-semibold leading-snug md:text-[min(1.9rem,3.4svh)] md:leading-snug">{stage.line}</p>
      <div className="mt-[4svh] flex max-h-80 min-h-0 max-w-3xl flex-1 flex-col">
        <div className="note mb-3 shrink-0">{stage.note}</div>
        <div className="label flex min-h-0 flex-1 items-center justify-center rounded-[22px] border-[1.5px] border-dashed border-ink/40 text-muted">
          photos + chart coming soon
        </div>
      </div>
    </section>
  )
}
