import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, RotateCcw } from 'lucide-react'
import { memories } from '../data/memories'
import { MemoryPhoto } from '../components/MemoryPhoto'
import { PapelPicado, SceneLabel, StarSeal, StringLights } from '../components/Decor'
import { Fireworks } from '../components/Fireworks'
import { PottedPlant } from '../components/Botanical'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  onReplay: () => void
  onOpenPhoto: (index: number) => void
}

export function FinaleScene({ onReplay, onOpenPhoto }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => {
        const a = (i * 9301 + 49297) % 233280
        const b = (i * 4177 + 12345) % 65536
        return {
          left: `${((a / 233280) * 100).toFixed(2)}%`,
          top: `${((b / 65536) * 72).toFixed(2)}%`,
          size: 1 + ((i * 13) % 3) * 0.8,
          delay: -(b / 65536) * 6,
        }
      }),
    [],
  )

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.finale-line > span', { yPercent: 112 })
        gsap.set('.finale-photo', { opacity: 0, y: 50 })
        gsap.set('.finale-reveal', { opacity: 0, y: 24 })

        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 22%', scrub: true },
          })
          .to('.finale-photo', { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'none' }, 0)
          .to('.finale-line > span', { yPercent: 0, stagger: 0.09, duration: 1.15, ease: 'none' }, 0.25)
          .to('.finale-reveal', { opacity: 1, y: 0, stagger: 0.14, duration: 0.8, ease: 'none' }, 0.9)

        gsap.to('.finale-moon', {
          y: 40,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('.finale-photo-1', {
          y: -30,
          rotate: -5,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('.finale-photo-3', {
          y: 22,
          rotate: 4,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="final"
      ref={sectionRef}
      data-scene="final"
      className="grain relative isolate overflow-hidden bg-[#070E26] text-cream"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#060A1E_0%,#0C1736_38%,#152447_68%,#2A1930_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_78%,rgba(242,182,60,0.13),transparent_55%),radial-gradient(ellipse_at_18%_18%,rgba(31,63,143,0.35),transparent_45%)]" />

      {/* stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-cream"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 6px rgba(247,235,214,0.8)',
            }}
          />
        ))}
      </div>

      {/* moon */}
      <div className="finale-moon pointer-events-none absolute right-[8%] top-[8%] h-24 w-24 sm:h-32 sm:w-32">
        <div className="absolute inset-0 rounded-full bg-[#F7E7BE] opacity-90 shadow-[0_0_80px_30px_rgba(247,231,190,0.25)]" />
        <div className="absolute left-[18%] top-[26%] h-4 w-4 rounded-full bg-[#D9C79E]/60" />
        <div className="absolute left-[52%] top-[58%] h-6 w-6 rounded-full bg-[#D9C79E]/40" />
        <div className="absolute left-[60%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#D9C79E]/50" />
      </div>

      {/* fireworks */}
      <Fireworks className="absolute inset-0 z-[1] h-full w-full" />

      {/* decorations */}
      <div className="absolute left-0 right-0 top-0 z-[2]">
        <PapelPicado flags={12} />
      </div>
      <div className="absolute left-[-4%] right-[-4%] top-[7%] z-[2] opacity-90">
        <StringLights bulbs={16} />
      </div>

      {/* distant hacienda */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] opacity-90">
        <svg viewBox="0 0 1440 280" className="h-auto w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 280V190h40v-50h70v50h70v-88h36v-40h22v40h36v88h84v-64h68v64h88v-48h62v-46h28v46h62v48h92v-78h44v-30h20v30h44v78h76v-56h66v56h90v-70h34v70h68v-34h62v-52h24v52h62v34h88v90z"
            fill="#081126"
          />
          <g fill="#F2B63C" opacity="0.5">
            <rect x="118" y="198" width="14" height="22" rx="7" />
            <rect x="286" y="182" width="14" height="22" rx="7" />
            <rect x="592" y="196" width="14" height="22" rx="7" />
            <rect x="782" y="182" width="14" height="24" rx="7" />
            <rect x="1034" y="190" width="14" height="24" rx="7" />
            <rect x="1294" y="198" width="14" height="22" rx="7" />
          </g>
          <g fill="#E8752A" opacity="0.28">
            <rect x="160" y="196" width="10" height="20" rx="5" />
            <rect x="672" y="192" width="10" height="20" rx="5" />
            <rect x="1108" y="188" width="10" height="22" rx="5" />
            <rect x="1360" y="198" width="10" height="20" rx="5" />
          </g>
        </svg>
      </div>

      {/* plants */}
      <PottedPlant
        variant="agave"
        className="pointer-events-none absolute -left-8 bottom-0 z-[2] hidden w-40 opacity-70 md:block lg:w-56"
        potColor="#7C341E"
      />
      <PottedPlant
        variant="cactus"
        className="pointer-events-none absolute -right-6 bottom-0 z-[2] hidden w-36 opacity-70 md:block lg:w-48"
        potColor="#8E492D"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-32">
        <SceneLabel number="07" light className="mb-7 justify-center">
          El gran final
        </SceneLabel>

        <div className="mb-10 grid w-full max-w-2xl grid-cols-3 items-end gap-3 sm:gap-5">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`finale-photo relative ${
                index === 0 ? 'finale-photo-1 -rotate-3 pb-3' : index === 2 ? 'finale-photo-3 rotate-3 pb-3' : 'pb-7'
              }`}
            >
              <div className="arch border-[6px] border-[#fbf3e1]/90 bg-[#fbf3e1] shadow-[0_20px_60px_-16px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-1">
                <MemoryPhoto
                  memory={memory}
                  onClick={() => onOpenPhoto(index)}
                  alt={`Photograph from Roberto's collection — memory ${index + 1}`}
                  className="arch aspect-[3/4] w-full"
                  objectPosition={index === 1 ? '50% 38%' : '50% 42%'}
                  imgClassName="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <span className="mt-2 block text-[8px] uppercase tracking-[0.2em] text-cream/40">0{index + 1}</span>
            </div>
          ))}
        </div>

        <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
          <span className="mask-line finale-line">
            <span>The world needs</span>
          </span>
          <span className="mask-line finale-line">
            <span>more people</span>
          </span>
          <span className="mask-line finale-line">
            <span>like you,</span>
          </span>
          <span className="mask-line finale-line">
            <span className="italic text-amarillo">Roberto.</span>
          </span>
        </h2>

        <p className="finale-reveal mx-auto mt-7 max-w-xl text-balance text-sm font-light leading-relaxed text-cream/70 sm:text-base">
          Keep making people laugh, keep being yourself, and never stop bringing everyone together
          around your table.
        </p>

        <div className="finale-reveal mt-10 flex items-center gap-3 text-amarillo/70">
          <span className="h-px w-12 bg-amarillo/30" />
          <StarSeal className="h-4 w-4" />
          <span className="h-px w-12 bg-amarillo/30" />
        </div>

        <p className="finale-reveal mt-6 font-script text-[clamp(2rem,5vw,3.7rem)] leading-none text-cream">
          ¡Que cumplas muchos más, <span className="text-amarillo">hermano!</span>
        </p>

        <div className="finale-reveal mt-10 flex flex-col items-center gap-6">
          <button type="button" onClick={onReplay} className="btn-fiesta group">
            <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
            Replay the fiesta
          </button>
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.32em] text-cream/45">
            <Heart className="h-3 w-3 text-terracotta" />
            Made with love for Roberto
            <Heart className="h-3 w-3 text-terracotta" />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-cream/25">
          <p className="font-script text-2xl sm:text-3xl">¡Que viva Roberto!</p>
          <div className="flex items-center gap-4 text-[8px] uppercase tracking-[0.3em]">
            <span>Una fiesta mexicana</span>
            <span className="h-1 w-1 rounded-full bg-cream/25" />
            <span>MMXXVI</span>
          </div>
        </div>
      </div>
    </section>
  )
}
