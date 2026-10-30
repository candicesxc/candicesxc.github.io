// The coloured tag that opens each funnel stage.
export default function StagePill({ stage }) {
  return (
    <div className="label stage-pill" style={{ background: stage.color, color: stage.text || '#003049' }}>
      stage {stage.n} · {stage.name}
    </div>
  )
}
