import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Heart, Sparkles, X } from 'lucide-react'
import { memories } from '../data/memories'
import { MemoryPhoto } from '../components/MemoryPhoto'
import { CornerFloral, SceneLabel, StarSeal, TalaveraDivider } from '../components/Decor'
import { SunRays } from '../components/Botanical'
import { launchConfetti } from '../lib/confetti'
import { fiestaAudio } from '../lib/audio'

gsap.registerPlugin(ScrollTrigger)

const wishes = [
  {
    spanish: 'Que tengas un año increíble.',
    english: 'Have an incredible year.',
    accent: '#8E1F2B',
    bg: '#FBF0D9',
    rotate: -2,
  },
  {
    spanish: '¡Salud!',
    english: 'Cheers!',
    accent: '#1F3F8F',
    bg: '#EAF1F4',
    rotate: 1.5,
  },
  {
    spanish: '¡Muchas felicidades!',
    english: 'Many congratulations!',
    accent: '#1F7A5E',
    bg: '#EDF3E5',
    rotate: -1,
  },
]

type Props = { onOpenPhoto: (index: number) => void }

export function FriendsScene({ onOpenPhoto }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.friends-line > span', { yPercent: 110 })
        gsap.set('.wish-card', { opacity: 0, y: 50 })
        gsap.set('.friend-photo', { opacity: 0, y: 40 })
        gsap.set('.letter-wrap', { opacity: 0, y: 50, rotate: 3 })

        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', end: 'top 38%', scrub: true },
          })
          .to('.friends-line > span', { yPercent: 0, duration: 1, stagger: 0.1, ease: 'none' })

        gsap.to('.wish-card', {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: '.wish-grid', start: 'top 88%', end: 'top 60%', scrub: true },
        })

        gsap.to('.friend-photo', {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: '.friends-collage', start: 'top 85%', end: 'top 50%', scrub: true },
        })

        gsap.to('.letter-wrap', {
          opacity: 1,
          y: 0,
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: letterRef.current, start: 'top 88%', end: 'top 62%', scrub: true },
        })

        gsap.to('.friend-photo-1', {
          y: -26,
          rotate: -7,
          ease: 'none',
          scrollTrigger: { trigger: '.friends-collage', start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('.friend-photo-2', {
          y: 30,
          rotate: 6,
          ease: 'none',
          scrollTrigger: { trigger: '.friends-collage', start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('.friend-photo-3', {
          y: -18,
          rotate: 2,
          ease: 'none',
          scrollTrigger: { trigger: '.friends-collage', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }, sectionRef)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  const reveal = () => {
    if (open) {
      setOpen(false)
      return
    }
    setOpen(true)
    fiestaAudio.fanfare()
    const el = letterRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      launchConfetti({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 90, power: 11, duration: 3000 })
    }
  }

  return (
    <section
      id="amigos"
      ref={sectionRef}
      data-scene="amigos"
      className="grain relative overflow-hidden bg-[#F1DFC3] py-24 text-ink sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(242,182,60,0.3),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(31,158,150,0.13),transparent_35%)]" />
      <CornerFloral className="absolute left-0 top-0 w-40 -scale-x-100 opacity-50 md:w-56" color="#1F3F8F" leaf="#1F7A5E" />
      <CornerFloral className="absolute bottom-0 right-0 w-40 -scale-y-100 opacity-50 md:w-56" color="#8E1F2B" leaf="#1F7A5E" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 talavera-border opacity-50" />
      <div className="absolute -right-20 top-10 hidden w-56 opacity-30 md:block">
        <SunRays className="spin-slow h-auto w-full" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <SceneLabel number="06" className="mb-5 justify-center">
            Los amigos
          </SceneLabel>

          <h2 className="font-display text-[clamp(2rem,5.4vw,4.6rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
            <span className="mask-line friends-line">
              <span>Good friends.</span>
            </span>
            <span className="mask-line friends-line">
              <span className="italic text-terracotta">Great memories.</span>
            </span>
            <span className="mask-line friends-line">
              <span>Unforgettable</span>
            </span>
            <span className="mask-line friends-line">
              <span className="title-underline italic text-vino">moments.</span>
            </span>
          </h2>
        </div>

        <div className="wish-grid mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
          {wishes.map((wish) => (
            <div key={wish.spanish} className="wish-card" style={{ transform: `rotate(${wish.rotate}deg)` }}>
              <div
                className="group relative h-full overflow-hidden rounded-[24px] border border-ink/10 p-6 shadow-card transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 sm:p-7"
                style={{ background: wish.bg }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <StarSeal className="h-5 w-5" style={{ color: wish.accent }} />
                  <span className="text-[8px] font-semibold uppercase tracking-[0.28em]" style={{ color: `${wish.accent}88` }}>
                    Con cariño
                  </span>
                </div>
                <p className="font-script text-[clamp(1.7rem,2.4vw,2.2rem)] leading-[1.05]" style={{ color: wish.accent }}>
                  {wish.spanish}
                </p>
                <p className="mt-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/45">
                  <span className="h-px w-4" style={{ background: wish.accent }} />
                  {wish.english}
                </p>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-10 blur-xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: wish.accent }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* photo collage */}
          <div className="friends-collage relative mx-auto h-[390px] w-full max-w-[540px] sm:h-[480px]">
            <div className="friend-photo friend-photo-1 absolute left-0 top-0 w-[56%] -rotate-6">
              <PhotoCard index={0} onOpenPhoto={onOpenPhoto} caption="Nuestra gente" />
            </div>
            <div className="friend-photo friend-photo-2 absolute right-0 top-[14%] w-[52%] rotate-[5deg]">
              <PhotoCard index={1} onOpenPhoto={onOpenPhoto} caption="Buenos tiempos" />
            </div>
            <div className="friend-photo friend-photo-3 absolute bottom-0 left-1/2 w-[50%] -translate-x-1/2 rotate-[-2deg]">
              <PhotoCard index={2} onOpenPhoto={onOpenPhoto} caption="Siempre juntos" />
            </div>

            <span className="absolute -left-2 bottom-[4%] hidden -rotate-6 font-script text-xl text-vino/55 sm:block">
              los que siempre están
            </span>
            <Sparkles className="absolute -right-1 top-[2%] h-5 w-5 text-amarillo" />
          </div>

          {/* interactive letter */}
          <div ref={letterRef} className="letter-wrap relative mx-auto w-full max-w-[440px]">
            <div className="mb-4 flex items-center gap-3">
              <Heart className="h-4 w-4 text-terracotta" />
              <span className="eyebrow text-ink/50">Una carta para ti</span>
              <span className="h-px flex-1 bg-ink/15" />
            </div>

            <div className="relative min-h-[370px] sm:min-h-[400px]">
              <AnimatePresence mode="wait">
                {!open ? (
                  <motion.button
                    key="envelope"
                    type="button"
                    onClick={reveal}
                    initial={{ opacity: 0, rotate: -2 }}
                    animate={{ opacity: 1, rotate: -1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="group relative flex min-h-[370px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[6px] border border-[#6C1220]/50 bg-vino p-8 text-center text-cream shadow-[0_45px_80px_-28px_rgba(42,23,16,0.7)] sm:min-h-[400px]"
                    aria-label="Open the birthday letter"
                  >
                    <div className="pointer-events-none absolute inset-3 border border-amarillo/20" />
                    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,transparent_0_14px,rgba(242,182,60,0.4)_15px,transparent_16px_30px)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)] [clip-path:polygon(0_0,100%_0,50%_100%)]" />

                    <div className="relative z-10">
                      <div className="mx-auto flex h-20 w-20 rotate-[-6deg] items-center justify-center rounded-full border-2 border-amarillo/70 bg-[radial-gradient(circle_at_35%_30%,#D24A50,#7C1420)] shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0">
                        <span className="font-display text-2xl font-black text-amarillo">R</span>
                      </div>
                      <p className="mt-6 font-script text-3xl text-amarillo">Una cartita</p>
                      <h3 className="mt-1 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight">
                        For the friend who feeds everyone.
                      </h3>
                      <p className="mx-auto mt-3 max-w-xs text-[10px] uppercase tracking-[0.24em] text-cream/50">
                        Click to break the seal
                      </p>
                      <span className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-cream/70 transition-colors group-hover:border-amarillo/60 group-hover:text-amarillo">
                        Abrir la carta <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    key="letter"
                    initial={{ opacity: 0, y: 26, rotate: 2, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="paper-texture relative flex min-h-[370px] flex-col justify-between overflow-hidden rounded-[6px] border border-[#b99a70] p-6 text-ink shadow-[0_45px_80px_-28px_rgba(42,23,16,0.55)] sm:min-h-[400px] sm:p-8"
                  >
                    <div className="pointer-events-none absolute inset-2 border border-dashed border-terracotta/20" />
                    <button
                      type="button"
                      onClick={reveal}
                      className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition hover:rotate-90 hover:border-ink/40 hover:text-ink"
                      aria-label="Close the letter"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="relative">
                      <p className="font-script text-2xl text-terracotta">Querido Roberto,</p>
                      <p className="mt-4 text-[13px] font-light leading-relaxed text-ink/75 sm:text-sm">
                        For the laughter you bring without trying, for the calm you keep when
                        everyone else loses theirs, and for the way your table always has room for
                        one more person.
                      </p>
                      <p className="mt-3 text-[13px] font-light leading-relaxed text-ink/75 sm:text-sm">
                        Here&apos;s to another year of good food, great company and the kind of
                        memories that stay with us. ¡Que cumplas muchos más, hermano!
                      </p>
                      <p className="mt-5 font-script text-xl text-vino/80">Con cariño, tus amigos.</p>
                    </div>

                    <div className="relative mt-6 flex items-end justify-between">
                      <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.22em] text-ink/35">
                        <span className="h-px w-8 bg-ink/20" /> hecho a mano
                      </div>
                      <StarSeal className="h-8 w-8 text-terracotta/35" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-4 text-center font-script text-lg text-ink/40">
              {open ? 'Con todo el cariño del mundo.' : 'Some words deserve a proper seal.'}
            </p>
          </div>
        </div>

        <TalaveraDivider className="mt-16" />
        <p className="mx-auto mt-6 max-w-2xl text-center font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-normal italic leading-snug text-ink/60">
          “A friend like Roberto makes the ordinary feel like a celebration.”
        </p>
      </div>
    </section>
  )
}

function PhotoCard({
  index,
  onOpenPhoto,
  caption,
}: {
  index: number
  onOpenPhoto: (index: number) => void
  caption: string
}) {
  const memory = memories[index]
  return (
    <figure className="group/arch relative">
      <div className="arch border-[7px] border-[#fbf3e1] bg-[#fbf3e1] shadow-[0_28px_50px_-20px_rgba(42,23,16,0.55)]">
        <div className="arch relative aspect-[3/4] overflow-hidden">
          <MemoryPhoto
            memory={memory}
            onClick={() => onOpenPhoto(index)}
            alt={`Photograph from Roberto's collection — memory ${index + 1}`}
            className="h-full w-full"
            objectPosition={index === 1 ? '50% 38%' : '50% 42%'}
            imgClassName="transition-transform duration-700 group-hover/arch:scale-105"
          />
        </div>
      </div>
      <figcaption className="mt-2 text-center font-script text-lg leading-none text-ink/55">{caption}</figcaption>
    </figure>
  )
}
