import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Expand, Heart, Sparkles } from 'lucide-react'
import { memories } from '../data/memories'
import { MemoryPhoto } from '../components/MemoryPhoto'
import { CornerFloral, SceneLabel, StarSeal, TalaveraDivider } from '../components/Decor'

gsap.registerPlugin(ScrollTrigger)

type Props = { onOpenPhoto: (index: number) => void }

export function MemoriesScene({ onOpenPhoto }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.memories-line > span', { yPercent: 108 })
        gsap.set('.memories-intro', { opacity: 0, y: 18 })
        gsap.set('.memory-photo', { opacity: 0 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              end: 'top 38%',
              scrub: true,
            },
          })
          .to('.memories-line > span', { yPercent: 0, duration: 1, stagger: 0.12, ease: 'none' })
          .to('.memories-intro', { opacity: 1, y: 0, duration: 0.7, ease: 'none' }, 0.2)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=230%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo(
          '.memory-photo-1',
          { xPercent: -75, yPercent: 55, rotate: -22, opacity: 0 },
          { xPercent: 0, yPercent: 0, rotate: -7, opacity: 1, duration: 1.4, ease: 'power2.out' },
          0.05,
        )
          .fromTo(
            '.memory-photo-2',
            { xPercent: 75, yPercent: 65, rotate: 20, opacity: 0 },
            { xPercent: 0, yPercent: 0, rotate: 5.5, opacity: 1, duration: 1.4, ease: 'power2.out' },
            0.2,
          )
          .fromTo(
            '.memory-photo-3',
            { yPercent: 80, scale: 0.78, rotate: 4, opacity: 0 },
            { yPercent: 0, scale: 1, rotate: -2, opacity: 1, duration: 1.5, ease: 'power2.out' },
            0.42,
          )
          .fromTo('.memory-annotation', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 0.8)
          .to('.memory-photo-1', { yPercent: -12, rotate: -4, ease: 'none', duration: 1.2 }, 1.35)
          .to('.memory-photo-2', { yPercent: -18, rotate: 8, ease: 'none', duration: 1.2 }, 1.35)
          .to('.memory-photo-3', { yPercent: -8, scale: 1.05, rotate: -1, ease: 'none', duration: 1.2 }, 1.35)
          .to('.memories-hint', { opacity: 1, duration: 0.4 }, 1.6)
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.memories-line > span', { yPercent: 108 })
        gsap.set('.memories-intro', { opacity: 0, y: 18 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'top 42%',
              scrub: true,
            },
          })
          .to('.memories-line > span', { yPercent: 0, duration: 1, stagger: 0.1, ease: 'none' })
          .to('.memories-intro', { opacity: 1, y: 0, duration: 0.7, ease: 'none' }, 0.2)

        document.querySelectorAll<HTMLElement>('.memory-photo').forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 70, rotate: i % 2 === 0 ? -4 : 4 },
            {
              opacity: 1,
              y: 0,
              rotate: i === 1 ? 3 : -2,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 62%',
                scrub: true,
              },
            },
          )
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="recuerdos"
      ref={sectionRef}
      data-scene="recuerdos"
      className="relative overflow-hidden bg-bone text-ink"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_15%_20%,rgba(194,87,47,0.14),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(31,158,150,0.12),transparent_34%)]" />
      <CornerFloral className="absolute left-0 top-0 w-36 -scale-x-100 opacity-50 md:w-52" color="#8E1F2B" leaf="#1F7A5E" />
      <CornerFloral className="absolute bottom-0 right-0 w-36 -scale-y-100 opacity-50 md:w-52" color="#1F3F8F" leaf="#1F7A5E" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 talavera-border opacity-60" />

      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center px-5 py-24 sm:px-8 lg:py-16"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <SceneLabel number="03" className="mb-5">
              Nuestros recuerdos
            </SceneLabel>

            <h2 className="font-display text-[clamp(2.35rem,6vw,5.1rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
              <span className="mask-line memories-line">
                <span>Life is better</span>
              </span>
              <span className="mask-line memories-line">
                <span>with the </span>
                <span className="italic text-vino">right people.</span>
              </span>
            </h2>

            <p className="memories-intro mt-5 max-w-xl text-balance text-sm font-light leading-relaxed text-ink/60 sm:text-base">
              Some moments become memories. Some people make those memories unforgettable.
            </p>
          </div>

          <div className="memories-stage relative mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-2 lg:h-[52vh] lg:max-w-6xl lg:grid-cols-1 lg:gap-0">
            {memories.map((memory, index) => {
              const position =
                index === 0
                  ? 'lg:left-[1%] lg:top-[6%] lg:w-[24%] lg:-rotate-6'
                  : index === 1
                    ? 'lg:right-[1%] lg:top-[12%] lg:w-[25%] lg:rotate-3'
                    : 'sm:col-span-2 sm:w-[64%] sm:justify-self-center lg:left-1/2 lg:top-[-4%] lg:w-[25.5%] lg:-translate-x-1/2 lg:rotate-[-1.5deg] z-20'

              return (
                <div
                  key={memory.id}
                  className={`memory-photo memory-photo-${index + 1} relative mx-auto w-[82%] max-w-[350px] ${
                    index === 2 ? 'sm:col-span-2' : ''
                  } lg:absolute lg:mx-0 lg:max-w-none ${position}`}
                >
                  <figure className="polaroid group/frame relative">
                    <span className="tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                    <MemoryPhoto
                      memory={memory}
                      onClick={() => onOpenPhoto(index)}
                      priority={index === 0}
                      alt={`Personal photograph from Roberto's collection — memory ${index + 1}`}
                      className="polaroid-img aspect-[4/5] w-full"
                      objectPosition={index === 1 ? '50% 38%' : '50% 42%'}
                    />
                    <figcaption className="flex items-end justify-between gap-2 px-1 py-4">
                      <div>
                        <p className="font-script text-[clamp(1.15rem,1.6vw,1.65rem)] leading-tight text-ink/80">
                          {memory.caption}
                        </p>
                        <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.24em] text-ink/40">
                          {memory.dateLabel} · {memory.note}
                        </p>
                      </div>
                      <StarSeal className="mb-1 h-4 w-4 shrink-0 text-terracotta/60" />
                    </figcaption>

                    <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-vino/85 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.16em] text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/frame:opacity-100">
                      <Expand className="h-2.5 w-2.5" /> Open
                    </span>
                  </figure>
                </div>
              )
            })}

            <div className="memory-annotation pointer-events-none absolute -left-2 top-[2%] hidden -rotate-6 items-center gap-2 text-vino/60 lg:flex">
              <span className="font-script text-2xl">los buenos tiempos</span>
              <svg viewBox="0 0 60 30" className="h-6 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4c18 0 38 8 52 22M46 24l9 3-2-9" />
              </svg>
            </div>

            <div className="memory-annotation pointer-events-none absolute -right-3 bottom-[7%] hidden rotate-3 items-center gap-2 text-ink/45 lg:flex">
              <svg viewBox="0 0 50 30" className="h-5 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M46 4C30 6 14 14 4 26M10 25l-7 2 1-7" />
              </svg>
              <span className="font-script text-xl">mi gente favorita</span>
            </div>
          </div>

          <div className="memories-hint mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.28em] text-ink/40 lg:mt-2">
            <Sparkles className="h-3.5 w-3.5" />
            Click any photograph to open a memory
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-ink/30 lg:flex">
          <Heart className="h-3 w-3" />
          <span className="font-script text-lg">guardado para siempre</span>
        </div>
      </div>

      <TalaveraDivider className="mx-auto hidden max-w-5xl px-6 pb-8 lg:flex" />
    </section>
  )
}
