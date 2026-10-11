import { useEffect, useRef } from 'react'
import { onProgress } from '../lib/scroll'

// A dashboard stat tile. Give it `format` for a number driven by page scroll progress,
// or `text` for a fixed phrase in place of the number.
export default function MetricCounter({ label, format, text, delta, tilt = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!format) return
    return onProgress((p) => {
      if (ref.current) ref.current.textContent = format(p)
    })
  }, [format])

  return (
    <div className={`panel px-2.5 py-2.5 md:px-5 md:py-4 ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="label text-[9px] leading-tight text-muted md:text-[11px]">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        {text ? (
          <span className="whitespace-nowrap font-display text-lg font-extrabold leading-8 text-pop md:text-[2.1rem] md:leading-[3rem]">
            {text}
          </span>
        ) : (
          <span ref={ref} className="font-display text-2xl font-extrabold tabular-nums md:text-5xl" />
        )}
        {delta && <span className="note hidden whitespace-nowrap text-xl md:inline">{delta}</span>}
      </div>
    </div>
  )
}
