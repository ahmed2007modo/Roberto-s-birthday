import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[700] h-[3px] bg-ink/5" aria-hidden="true">
      <div
        ref={ref}
        className="h-full origin-left bg-[linear-gradient(90deg,#1F9E96,#F2B63C,#E8752A,#8E1F2B)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
