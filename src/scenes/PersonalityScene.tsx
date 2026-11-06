import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { SceneLabel, TalaveraDivider, CornerFloral } from '../components/Decor'
import { FunnyDoodle, CalmDoodle, ChefDoodle } from '../components/PersonalityArt'

gsap.registerPlugin(ScrollTrigger)

type Trait = {
  number: string
  spanish: string
  english: string
  copy: string
  accent: string
  bg: string
  chip: string
  art: 'funny' | 'calm' | 'chef'
  tagline: string
}

const traits: Trait[] = [
  {
    number: '01',
    spanish: 'El Gracioso',
    english: 'The Funny One',
    copy: 'Some people tell jokes. Roberto makes ordinary moments unforgettable.',
    accent: '#8E1F2B',
    bg: '#FBF0D9',
    chip: '#F6DFAE',
    art: 'funny',
    tagline: 'Laughter, on tap',
  },
  {
    number: '02',
    spanish: 'El Tranquilo',
    english: 'The Calm One',
    copy: 'While everyone else is panicking, Roberto is probably just chilling.',
    accent: '#1F3F8F',
    bg: '#E7F2EC',
    chip: '#CBE7DD',
    art: 'calm',
    tagline: 'Zero panic energy',
  },
  {
    number: '03',
    spanish: 'El Chef',
    english: 'The Chef',
    copy: 'Because friendship is important, but apparently feeding everyone is even more important.',
    accent: '#C2572F',
    bg: '#FBEBDD',
    chip: '#F6D3BA',
    art: 'chef',
    tagline: 'Table always open',
  },
]

export function PersonalityScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.personality-line > span', { yPercent: 105 })
        gsap.set('.personality-intro', { opacity: 0, y: 16 })
        gsap.set('.trait-card-wrap', { opacity: 0, y: 90 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top 80%',
              end: 'top 35%',
              scrub: true,
            },
          })
          .to('.personality-line > span', { yPercent: 0, duration: 1, stagger: 0.12, ease: 'none' })
          .to('.personality-intro', { opacity: 1, y: 0, duration: 0.6, ease: 'none' }, 0.15)

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.trait-grid',
            start: 'top 88%',
            end: 'top 42%',
            scrub: true,
          },
        })
        cardTl
          .to('.trait-card-wrap', { opacity: 1, y: 0, duration: 1.1, stagger: 0.16, ease: 'power2.out' })
          .from('.trait-card-wrap:nth-child(1) .tilt-card', { rotate: -5, scale: 0.95, duration: 1 }, 0)
          .from('.trait-card-wrap:nth-child(2) .tilt-card', { rotate: 4, scale: 0.95, duration: 1 }, 0.16)
          .from('.trait-card-wrap:nth-child(3) .tilt-card', { rotate: -3, scale: 0.95, duration: 1 }, 0.32)
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.personality-line > span', { yPercent: 105 })
        gsap.set('.trait-card-wrap', { opacity: 0, y: 90 })
        gsap.set('.personality-intro', { opacity: 0, y: 16 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=185%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to('.personality-line > span', { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'power2.out' }, 0)
          .to('.personality-intro', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2)
          .to('.trait-card-wrap', { opacity: 1, y: 0, duration: 1.3, stagger: 0.22, ease: 'power2.out' }, 0.35)
          .from('.trait-card-wrap:nth-child(1) .tilt-card', { rotate: -7, x: -40, duration: 1.3, ease: 'power2.out' }, 0.35)
          .from('.trait-card-wrap:nth-child(2) .tilt-card', { rotate: 2, y: 60, duration: 1.3, ease: 'power2.out' }, 0.55)
          .from('.trait-card-wrap:nth-child(3) .tilt-card', { rotate: 7, x: 40, duration: 1.3, ease: 'power2.out' }, 0.75)
          .to('.trait-marquee', { xPercent: -18, duration: 2, ease: 'none' }, 1.2)
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="protagonista"
      ref={sectionRef}
      data-scene="protagonista"
      className="relative bg-cream text-ink"
    >
      <CornerFloral className="absolute right-0 top-0 w-40 rotate-90 opacity-60 md:w-56" />
      <CornerFloral className="absolute bottom-0 left-0 w-40 -rotate-90 opacity-60 md:w-56" />

      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-24 sm:px-8 lg:py-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 talavera-border opacity-70" />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-amarillo/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-turquesa/10 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <SceneLabel number="02" className="mb-6">
              El protagonista
            </SceneLabel>

            <h2 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
              <span className="mask-line personality-line">
                <span>Meet the</span>
              </span>
              <span className="mask-line personality-line">
                <span className="italic text-vino">legend.</span>
              </span>
            </h2>

            <p className="personality-intro mt-5 max-w-lg text-balance text-sm font-light leading-relaxed text-ink/65 sm:text-base">
              Funny. Calm. Feeds everyone. Three sides of the same wonderful human — pick a card,
              he&apos;s all three.
            </p>
          </div>

          <div className="trait-grid mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-7">
            {traits.map((trait) => (
              <div key={trait.spanish} className="trait-card-wrap">
                <TraitCard trait={trait} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-ink/45">
            <span className="h-px w-10 bg-ink/20" />
            <p className="font-script text-xl sm:text-2xl">
              Three traits. One legendary friend.
            </p>
            <span className="h-px w-10 bg-ink/20" />
          </div>
        </div>

        <div className="trait-marquee pointer-events-none absolute bottom-4 left-0 hidden w-[130%] whitespace-nowrap font-display text-[11vw] font-black uppercase leading-none text-ink/[0.035] lg:block">
          El Gracioso · El Tranquilo · El Chef · El Gracioso · El Tranquilo · El Chef ·
        </div>
      </div>

      <TalaveraDivider className="mx-auto max-w-5xl px-6 pb-10" />
    </section>
  )
}

function TraitCard({ trait }: { trait: Trait }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const quickRef = useRef<{
    rx: ReturnType<typeof gsap.quickTo>
    ry: ReturnType<typeof gsap.quickTo>
    y: ReturnType<typeof gsap.quickTo>
  } | null>(null)

  useEffect(() => {
    if (!cardRef.current) return
    quickRef.current = {
      rx: gsap.quickTo(cardRef.current, 'rotationX', { duration: 0.55, ease: 'power3.out' }),
      ry: gsap.quickTo(cardRef.current, 'rotationY', { duration: 0.55, ease: 'power3.out' }),
      y: gsap.quickTo(cardRef.current, 'y', { duration: 0.55, ease: 'power3.out' }),
    }
    gsap.set(cardRef.current, { transformPerspective: 1000 })
    return () => {
      quickRef.current = null
    }
  }, [])

  const handleMove = (e: React.PointerEvent) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = cardRef.current
    const q = quickRef.current
    if (!el || !q) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    q.ry((px - 0.5) * 12)
    q.rx((0.5 - py) * 12)
    q.y(-10)
    if (artRef.current) {
      gsap.to(artRef.current, { x: (px - 0.5) * -16, y: (py - 0.5) * -10, duration: 0.6, ease: 'power2.out' })
    }
  }

  const handleLeave = () => {
    const q = quickRef.current
    if (q) {
      q.rx(0)
      q.ry(0)
      q.y(0)
    }
    if (artRef.current) {
      gsap.to(artRef.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.55)' })
    }
  }

  const Art = trait.art === 'funny' ? FunnyDoodle : trait.art === 'calm' ? CalmDoodle : ChefDoodle

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="tilt-card group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-ink/15 shadow-card"
      style={{ background: trait.bg }}
    >
      <div className="h-2 w-full talavera-border opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: trait.accent }}
      />

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-script text-2xl leading-none" style={{ color: trait.accent }}>
              {trait.number}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-black uppercase leading-none tracking-[-0.02em]">
              {trait.spanish}
            </h3>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/50">
              {trait.english}
            </p>
          </div>
          <span
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink/30 group-hover:text-ink"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div
          ref={artRef}
          className="relative my-2 h-[170px] w-full sm:h-[190px] lg:h-[180px] xl:h-[210px]"
        >
          <Art className="absolute inset-0 h-full w-full" />
        </div>

        <div className="mt-auto">
          <div className="mb-3 h-px w-full" style={{ background: `${trait.accent}33` }} />
          <p className="text-[13.5px] leading-relaxed text-ink/70 sm:text-[15px]">{trait.copy}</p>
          <div className="mt-5 flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em]"
              style={{ background: trait.chip, color: trait.accent }}
            >
              {trait.tagline}
            </span>
            <span className="font-script text-lg text-ink/35 transition-colors group-hover:text-ink/60">
              ¡así es!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
