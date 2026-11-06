import { useEffect, useState } from 'react'
import { scenes } from '../data/memories'

type Props = {
  show: boolean
  onNavigate: (id: string) => void
}

export function Nav({ show, onNavigate }: Props) {
  const [active, setActive] = useState<string>('bienvenidos')

  useEffect(() => {
    if (!show) return
    let raf = 0
    const update = () => {
      raf = 0
      const mark = window.innerHeight * 0.52
      let current: string = scenes[0].id
      for (const scene of scenes) {
        const el = document.getElementById(scene.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= mark) current = scene.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [show])

  return (
    <>
      <button
        type="button"
        onClick={() => onNavigate('bienvenidos')}
        className={`fixed left-4 top-4 z-[620] hidden items-center gap-2.5 rounded-full border border-ink/10 bg-cream/90 py-1.5 pl-1.5 pr-4 shadow-[0_10px_30px_-10px_rgba(42,23,16,0.4)] backdrop-blur-md transition-all duration-700 hover:bg-cream md:flex ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-6 opacity-0'
        }`}
        aria-label="Back to the beginning"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vino font-display text-sm font-black text-amarillo">
          R
        </span>
        <span className="text-left">
          <span className="block text-[8px] font-semibold uppercase leading-none tracking-[0.22em] text-ink/45">
            ¡Que viva!
          </span>
          <span className="mt-0.5 block font-display text-[13px] font-bold leading-none text-ink">Roberto</span>
        </span>
      </button>

      <nav
        aria-label="Scenes"
        className={`fixed right-2.5 top-1/2 z-[620] -translate-y-1/2 transition-all duration-700 sm:right-4 ${
          show ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-10 opacity-0'
        }`}
      >
        <div className="flex flex-col items-end gap-0.5 rounded-full border border-ink/10 bg-cream/80 px-1.5 py-3 shadow-[0_16px_40px_-14px_rgba(42,23,16,0.45)] backdrop-blur-md">
          {scenes.map((scene) => {
            const isActive = active === scene.id
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onNavigate(scene.id)}
                className="nav-link group flex h-8 items-center gap-2"
                aria-label={`${scene.number} — ${scene.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="nav-label whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.14em] text-cream shadow-sm">
                  {scene.number} · {scene.label}
                </span>
                <span
                  className={`nav-dot relative flex h-6 w-6 items-center justify-center rounded-full border text-[7px] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'scale-110 border-vino bg-vino text-amarillo shadow-[0_0_0_3px_rgba(142,31,43,0.14)]'
                      : 'border-ink/15 bg-transparent text-ink/35 group-hover:border-ink/40 group-hover:text-ink/70'
                  }`}
                >
                  {scene.number}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
