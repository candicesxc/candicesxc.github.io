import { useEffect, useState } from 'react'

// True once the element has been on screen (by `ratio` of the viewport height), and it
// stays true. Things that fade or drop in on arrival start hidden, so this must never
// miss. It listens to an IntersectionObserver, to scroll/resize and to the tab becoming
// visible, and also polls on a slow timer until it fires: observers and scroll events are
// only delivered while the browser is painting, a timer is not.
export default function useSeen(ref, ratio = 0.35) {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (seen) return
    const el = ref.current
    if (!el) return
    const check = () => {
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const visible = Math.min(r.bottom, h) - Math.max(r.top, 0)
      if (visible >= Math.min(r.height, h) * ratio) setSeen(true)
    }
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && check(), {
      threshold: [0, ratio, 1],
    })
    io.observe(el)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    document.addEventListener('visibilitychange', check)
    const poll = setInterval(check, 400)
    check()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      document.removeEventListener('visibilitychange', check)
      clearInterval(poll)
    }
  }, [ref, ratio, seen])

  return seen
}
