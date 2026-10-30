import { useId, useState } from 'react'

function Row({ label, children }) {
  return (
    <div className="border-t border-line pt-2.5">
      <dt className="label text-muted">{label}</dt>
      <dd className="mt-0.5 text-[1.0625rem] leading-snug">{children}</dd>
    </div>
  )
}

// One compact, expandable work example: the problem, what I did, a decision, what came of it.
export default function WorkExample({ work }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="mt-5 max-w-[34rem]">
      <button type="button" className="btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {open ? 'hide the work' : 'see the work'}
        <span aria-hidden="true" className={`transition-transform duration-[260ms] ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div id={id} className="panel dialog-in mt-3 p-4 md:p-5">
          <p className="font-display text-xl font-bold leading-tight">{work.title}</p>
          <dl className="mt-3 space-y-2.5">
            <Row label="the problem">{work.problem}</Row>
            <Row label="what i did">{work.did}</Row>
            <Row label="a decision">{work.decision}</Row>
            <Row label={work.resultLabel || 'what came of it'}>{work.result}</Row>
          </dl>
        </div>
      )}
    </div>
  )
}
