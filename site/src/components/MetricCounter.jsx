import { useEffect, useRef } from 'react'
import { onProgress } from '../lib/scroll'

// A dashboard stat tile. Give it `format` for a number driven by page scroll progress, or
// `text` for a fixed phrase in place of the number. `source` says, right on the tile,
// whether the number is measured or made up.
export default function MetricCounter({ label, format, text, source, flourish, tilt = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!format) return
    return onProgress((p) => {
      if (ref.current) ref.current.textContent = format(p)
    })
  }, [format])

  return (
    <div className={`panel flex flex-col px-2.5 py-2.5 md:px-4 md:py-3 ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="label text-[10px] leading-tight text-muted md:text-[11px]">{label}</div>
      <div className="mt-auto pt-1">
        {text ? (
          <span className="block whitespace-nowrap font-display text-[1.1rem] font-extrabold leading-7 text-pop md:text-[clamp(1.2rem,2.9svh,1.625rem)] md:leading-9">
            {text}
          </span>
        ) : (
          <span ref={ref} className="block font-display text-[1.25rem] font-extrabold leading-7 tabular-nums md:text-[clamp(1.25rem,3.2svh,1.875rem)] md:leading-9" />
        )}
        {source && (
          <span className="note block !text-[15px] md:!text-base">
            {source}
            {flourish && <span className="hidden md:inline">{flourish}</span>}
          </span>
        )}
      </div>
    </div>
  )
}
