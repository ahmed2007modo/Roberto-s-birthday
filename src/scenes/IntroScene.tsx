import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { PapelPicado, StringLights, Particles, StarSeal } from '../components/Decor'
import { PottedPlant, SunRays } from '../components/Botanical'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  onEnter: () => void
  onNavigate: (id: string) => void
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function IntroScene({ onEnter, onNavigate }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const inviteRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [opening, setOpening] = useState(false)

  useLayoutEffect(() => {
    const reduced = reducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(heroRef.current, { opacity: 1 })
        return
      }

      gsap.set(heroRef.current, { opacity: 0 })
      gsap.set('.hero-line > span', { yPercent: 112 })
      gsap.set([subtitleRef.current, cueRef.current], { opacity: 0, y: 20 })
      gsap.from(inviteRef.current, { opacity: 0, y: 28, duration: 1.1, delay: 0.25, ease: 'power3.out' })

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      parallax
        .to('.intro-sun', { yPercent: 22, scale: 1.08, ease: 'none' }, 0)
        .to('.intro-wall', { yPercent: -5, ease: 'none' }, 0)
        .to('.intro-plant-left', { yPercent: -3, rotate: -2, ease: 'none' }, 0)
        .to('.intro-plant-right', { yPercent: -4, rotate: 2, ease: 'none' }, 0)
        .to('.intro-flags', { yPercent: -28, ease: 'none' }, 0)
        .to('.intro-lights', { yPercent: -18, ease: 'none' }, 0)
    }, sectionRef)

    const localTimers = timers.current

    return () => {
      localTimers.forEach((t) => window.clearTimeout(t))
      ctx.revert()
    }
  }, [])

  const openDoors = () => {
    if (opening || revealed) return
    setOpening(true)
    const reduced = reducedMotion()

    if (reduced) {
      setRevealed(true)
      onEnter()
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setRevealed(true)
        setOpening(false)
        onEnter()
      },
    })

    tl.to(inviteRef.current, { opacity: 0, y: -36, duration: 0.5, ease: 'power2.in' }, 0)
      .to(leftDoorRef.current, { xPercent: -103, rotateY: -14, duration: 2.05, ease: 'power4.inOut' }, 0.12)
      .to(rightDoorRef.current, { xPercent: 103, rotateY: 14, duration: 2.05, ease: 'power4.inOut' }, 0.12)
      .fromTo(beamRef.current, { opacity: 0, scaleX: 0.1 }, { opacity: 0.9, scaleX: 1, duration: 0.7 }, 0.3)
      .to(beamRef.current, { opacity: 0, duration: 1.1 }, 1.35)
      .to(heroRef.current, { opacity: 1, duration: 0.5 }, 0.95)
      .to('.hero-line > span', { yPercent: 0, duration: 1.15, stagger: 0.09, ease: 'power3.out' }, 1.05)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.55)
      .to(cueRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.75)

    // Safety: if the tab throttles GSAP's ticker, the fiesta must still begin.
    const safety = window.setTimeout(() => {
      if (!revealed) {
        setRevealed(true)
        setOpening(false)
        onEnter()
      }
    }, 3400)
    timers.current.push(safety)
  }

  return (
    <section
      id="bienvenidos"
      ref={sectionRef}
      data-scene="bienvenidos"
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-[#C96A3C]"
    >
      {/* ---------------- courtyard backdrop ---------------- */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F9D488_0%,#F3B369_30%,#E49256_55%,#C96A3C_100%)]" />
      <div className="intro-sun absolute right-[-6%] top-[-18%] h-[68vw] max-h-[780px] w-[68vw] max-w-[780px] md:right-[2%] md:top-[-26%]">
        <SunRays className="spin-slow h-full w-full opacity-70" />
      </div>
      <div className="absolute left-[6%] top-[12%] h-24 w-40 rounded-full bg-cream/20 blur-3xl" />
      <div className="absolute right-[18%] top-[24%] h-16 w-56 rounded-full bg-cream/15 blur-2xl" />

      {/* distant wall */}
      <div className="intro-wall absolute inset-x-0 bottom-0 top-[27%]">
        <div className="absolute inset-x-0 top-0 h-3 bg-[#F2B63C]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#D98A5B_0%,#C97345_58%,#B55F37_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(90deg,transparent_0_118px,rgba(90,40,20,0.55)_119px_120px)]" />

        {/* central arched doorway */}
        <div className="absolute bottom-0 left-1/2 h-[88%] w-[min(80vw,660px)] -translate-x-1/2">
          <div className="talavera-border arch absolute inset-0 p-[10px] shadow-[0_30px_80px_-20px_rgba(74,28,12,0.65)]">
            <div className="arch relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#F9E7C4_0%,#F1CD97_46%,#DDA269_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,247,220,0.95),transparent_62%)]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(142,31,43,0.18))]" />
              <div className="absolute left-1/2 top-[8%] h-[74%] w-[62%] -translate-x-1/2 rounded-t-full border border-ink/10" />
              <div className="absolute left-1/2 top-[16%] h-[2px] w-[62%] -translate-x-1/2 bg-ink/10" />
            </div>
          </div>
        </div>

        {/* side niches */}
        {[
          { left: '6%', size: 'w-[13vw] max-w-[190px] h-[46%]' },
          { right: '7%', size: 'w-[14vw] max-w-[210px] h-[52%]' },
        ].map((n, i) => (
          <div
            key={i}
            className={`absolute bottom-0 hidden md:block ${n.size}`}
            style={{ left: n.left, right: n.right }}
          >
            <div className="talavera-border arch h-full p-[6px]">
              <div className="arch h-full w-full bg-[#8E492D] shadow-[inset_0_20px_50px_rgba(50,18,8,0.8)]" />
            </div>
          </div>
        ))}

        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 h-[13%] bg-[#A9512F]">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#E8A65B]/60" />
          <div className="talavera-tile absolute inset-0 opacity-45 [mask-image:linear-gradient(180deg,transparent,black_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(70,25,10,0.36),rgba(35,12,5,0.66))]" />
        </div>
      </div>

      {/* plants */}
      <div className="intro-plant-left absolute -left-2 bottom-4 z-[5] w-[34vw] max-w-[300px] origin-bottom md:left-[2%] md:w-[22vw]">
        <PottedPlant variant="monstera" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(60,20,8,0.35)]" />
      </div>
      <div className="intro-plant-right absolute -right-3 bottom-2 z-[5] w-[30vw] max-w-[280px] origin-bottom md:right-[2%] md:w-[20vw]">
        <PottedPlant variant="agave" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(60,20,8,0.35)]" potColor="#A8452A" />
      </div>

      {/* hanging decorations */}
      <div className="intro-flags absolute -top-1 left-0 right-0 z-[35] px-1 md:px-3">
        <PapelPicado flags={10} />
      </div>
      <div className="intro-lights absolute top-[9%] left-[-4%] right-[-4%] z-[34] opacity-95">
        <StringLights bulbs={15} />
      </div>
      <Particles count={22} />

      {/* ---------------- hero revealed behind the doors ---------------- */}
      <div
        ref={heroRef}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-36 text-center sm:px-8 md:pt-40"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,244,215,0.58),transparent_64%)]" />
        <div className="mb-5 flex items-center gap-3 text-vino/80">
          <span className="h-px w-8 bg-vino/40" />
          <span className="eyebrow">Roberto · cumpleaños · México</span>
          <span className="h-px w-8 bg-vino/40" />
        </div>

        <h1 className="font-display text-shadow-warm max-w-5xl text-[clamp(2.55rem,7.4vw,6.6rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-ink">
          <span className="mask-line hero-line">
            <span>Today, the</span>
          </span>
          <span className="mask-line hero-line">
            <span className="font-normal italic tracking-[-0.02em] text-vino">fiesta</span>{' '}
            <span>is all</span>
          </span>
          <span className="mask-line hero-line">
            <span>about you.</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 max-w-xl text-balance text-base font-light leading-relaxed text-ink/75 sm:text-lg md:text-xl"
        >
          One incredible person. Countless unforgettable memories.
        </p>

        <div className="relative mt-8">
          <span className="absolute -left-16 -top-9 hidden -rotate-6 font-script text-3xl text-vino sm:block">
            ¡Bienvenidos!
          </span>
          <div ref={cueRef} className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('protagonista')}
              className="btn-outline border-ink/40 bg-cream/35 backdrop-blur-sm hover:bg-vino hover:text-cream"
            >
              Enter the fiesta <ArrowDown className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ink/50">
              <span className="h-px w-8 bg-ink/25" />
              scroll to celebrate
              <span className="h-px w-8 bg-ink/25" />
            </div>
          </div>
        </div>

        <p className="absolute bottom-[14%] left-1/2 hidden -translate-x-1/2 items-center gap-2 font-script text-xl text-vino/70 md:flex">
          <Sparkles className="h-4 w-4" aria-hidden="true" /> made with love, served with tacos
        </p>
      </div>

      {/* ---------------- wooden entrance doors ---------------- */}
      {!revealed && (
        <div
          ref={stageRef}
          className="absolute inset-0 z-30 cursor-pointer"
          style={{ perspective: '1700px' }}
          onClick={openDoors}
          aria-hidden="true"
        >
          <div
            ref={leftDoorRef}
            className="wood absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden border-r border-[#3B170D]/70 shadow-[20px_0_60px_rgba(30,10,4,0.45)] will-change-transform"
          >
            <DoorOrnament side="left" />
          </div>
          <div
            ref={rightDoorRef}
            className="wood absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden border-l border-[#3B170D]/70 shadow-[-20px_0_60px_rgba(30,10,4,0.45)] will-change-transform"
          >
            <DoorOrnament side="right" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(242,182,60,0.25),rgba(20,6,2,0.7),rgba(242,182,60,0.2))]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(30,10,4,0.58)_100%)]" />
        </div>
      )}

      {/* light spilling through the open doors */}
      <div
        ref={beamRef}
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[36] w-[46vw] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,238,190,0.82),transparent)] opacity-0 blur-2xl"
      />

      {/* ---------------- invitation on the doors ---------------- */}
      {!revealed && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-5 py-16">
          <div
            ref={inviteRef}
            className="pointer-events-auto relative flex max-w-xl flex-col items-center text-center text-cream"
          >
            <div className="mb-4 flex items-center gap-3 text-amarillo/90">
              <span className="h-px w-10 bg-amarillo/40" />
              <StarSeal className="h-4 w-4" />
              <span className="eyebrow text-cream/65">Una celebración mexicana</span>
              <StarSeal className="h-4 w-4" />
              <span className="h-px w-10 bg-amarillo/40" />
            </div>

            <p className="font-script text-[clamp(3.5rem,11vw,7rem)] leading-[0.9] text-amarillo drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
              ¡Bienvenidos!
            </p>

            <h2 className="mt-4 font-display text-[clamp(1.6rem,4.2vw,2.9rem)] font-semibold leading-tight text-cream">
              Tonight, we celebrate <em className="text-amarillo">Roberto</em>.
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-cream/75 sm:text-base">
              Three traits. One legendary friend. A courtyard full of papel picado, good food and
              better company.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                openDoors()
              }}
              className="btn-fiesta group mt-8"
              disabled={opening}
            >
              {opening ? 'Abriendo…' : '¡Vamos!'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-5 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-cream/45">
              <span>Click to open the doors</span>
              <span className="normal-case tracking-[0.08em] text-cream/35">
                Sound is off until you turn it on
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3 text-amarillo/55">
              <span className="h-px w-16 bg-current" />
              <span className="font-script text-lg">que empiece la fiesta</span>
              <span className="h-px w-16 bg-current" />
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-ink/35 md:flex">
        <span>Roberto</span>
        <span className="h-1 w-1 rounded-full bg-ink/25" />
        <span>MMXXVI</span>
      </div>
    </section>
  )
}

function DoorOrnament({ side }: { side: 'left' | 'right' }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(90deg,transparent_0_58px,rgba(30,10,4,0.42)_59px_61px,transparent_62px_96px)]" />
      <div className="absolute inset-x-[9%] inset-y-[8%] rounded-t-[46%] border-2 border-[#E8B167]/30">
        <div className="absolute inset-[7%] rounded-t-[46%] border border-[#E8B167]/20 bg-[linear-gradient(180deg,rgba(255,215,150,0.06),transparent_40%,rgba(20,6,2,0.18))]" />
        <div className="absolute inset-x-[10%] top-[8%] h-[16%] rounded-t-[60%] border border-[#E8B167]/25">
          <div className="absolute inset-1 rounded-t-[60%] opacity-40 [background-image:repeating-linear-gradient(45deg,#E8B167_0_1px,transparent_1px_13px)]" />
        </div>
        <div className="absolute inset-x-[10%] top-[32%] h-[26%] border border-[#E8B167]/20 bg-[linear-gradient(160deg,rgba(255,235,190,0.05),transparent)]">
          <div className="absolute inset-4 border border-[#E8B167]/15" />
          <StarSeal className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-[#E8B167]/30" />
        </div>
        <div className="absolute inset-x-[10%] bottom-[8%] h-[22%] border border-[#E8B167]/20">
          <div className="absolute inset-x-[12%] top-1/2 h-px bg-[#E8B167]/20" />
        </div>
      </div>
      <div className="absolute top-[20%] flex flex-col gap-5 opacity-60" style={{ [side]: '6%' } as React.CSSProperties}>
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-[#E8B167] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
        ))}
      </div>
      <div
        className="absolute top-[50%] h-14 w-14 rounded-full border-[5px] border-[#3B170D]/80 bg-[#E8B167]/20 shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
        style={{ [side]: '4%' } as React.CSSProperties}
      >
        <span className="absolute inset-2 rounded-full border-2 border-[#3B170D]/50" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,220,160,0.08),transparent_35%,rgba(20,6,2,0.3))]" />
    </>
  )
}
