// The coloured tag that opens each funnel stage.
export default function StagePill({ stage, tight }) {
  return (
    <div
      className={`label ${tight ? 'mb-[2.5svh]' : 'mb-[4.5svh]'} inline-flex w-fit shrink-0 -rotate-1 items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-3 text-[14px] font-medium text-[#003049] shadow-[3px_3px_0_var(--ink)]`}
      style={{ background: stage.color, color: stage.text }}
    >
      stage {stage.n} · {stage.name}
    </div>
  )
}
