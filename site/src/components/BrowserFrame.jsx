// A Chrome-style window: traffic lights, one tab, an address bar, then the page area.
// `children` fills the page area (a recording, an embed, or a fallback panel).
export default function BrowserFrame({ title, icon, address, href, children, className = '' }) {
  return (
    <div
      className={`flex min-h-0 flex-col overflow-hidden rounded-[18px] border-[1.5px] border-ink bg-[#dee1e6] shadow-[5px_5px_0_var(--ink)] ${className}`}
    >
      <div className="flex shrink-0 items-end gap-2 px-3 pt-2">
        <div className="flex gap-1.5 pb-2.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 max-w-[200px] items-center gap-2 rounded-t-[10px] bg-white px-3 py-1.5 text-[13px] text-[#202124] [font-family:system-ui,sans-serif]">
          {icon && <img src={icon} alt="" className="h-3.5 w-3.5 shrink-0 object-contain" />}
          <span className="truncate">{title}</span>
          <span className="ml-2 text-[#5f6368]" aria-hidden="true">
            ×
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-1.5 [font-family:system-ui,sans-serif]">
        <span className="hidden text-[#5f6368] sm:inline" aria-hidden="true">
          ← → ↻
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3 py-1 text-[13px] text-[#202124]"
        >
          <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" className="shrink-0">
            <path
              d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6.5h-9z"
              fill="none"
              stroke="#5f6368"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">{address}</span>
        </a>
      </div>
      <div className="relative min-h-0 flex-1 bg-white">{children}</div>
    </div>
  )
}
