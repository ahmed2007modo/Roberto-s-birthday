import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, RotateCcw, Volume2, ArrowRight } from 'lucide-react'
import { PinataArt } from '../components/PinataArt'
import { PapelPicado, Particles, StringLights, StarSeal } from '../components/Decor'
import { launchConfetti, paperPuff } from '../lib/confetti'
import { fiestaAudio } from '../lib/audio'

gsap.registerPlugin(ScrollTrigger)

const HITS_TO_BREAK = 8

type Props = { onNavigate: (id: string) => void }

export function PinataScene({ onNavigate }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const swingRef = useRef<HTMLDivElement>(null)
  const breakingRef = useRef(false)
  const [hits, setHits] = useState(0)
  const [broken, setBroken] = useState(false)
  const [pum, setPum] = useState(0)
  const damage = Math.min(1, hits / HITS_TO_BREAK)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.pinata-heading',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'top 35%', scrub: true },
          },
        )
        gsap.fromTo(
          '.pinata-sub',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'top 30%', scrub: true },
          },
        )
        gsap.to('.pinata-float', {
          y: 22,
          rotate: 1.4,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleHit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (broken || breakingRef.current) return
    const el = swingRef.current
    if (!el) return

    const next = hits + 1
    setHits(next)
    setPum((n) => n + 1)
    fiestaAudio.hit()
    paperPuff(event.clientX, event.clientY, next >= HITS_TO_BREAK ? 28 : 11)

    gsap.killTweensOf(el)
    const dir = next % 2 === 0 ? -1 : 1
    gsap
      .timeline()
      .to(el, { rotate: dir * 8, x: dir * 7, duration: 0.11, ease: 'power1.out' })
      .to(el, { rotate: -dir * 6, x: -dir * 5, duration: 0.13, ease: 'power1.inOut' })
      .to(el, { rotate: dir * 3, x: 0, duration: 0.14, ease: 'power1.inOut' })
      .to(el, { rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' })

    if (next >= HITS_TO_BREAK) {
      breakingRef.current = true
      const rect = el.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height * 0.45
      window.setTimeout(() => {
        setBroken(true)
        fiestaAudio.crack()
        fiestaAudio.pop()
        launchConfetti({ x, y, count: 280, power: 21, scalar: 1.15, duration: 6200 })
        window.setTimeout(() => {
          launchConfetti({ x, y: y - 40, count: 130, power: 14, scalar: 0.9, duration: 5000 })
          launchConfetti({
            x: window.innerWidth / 2,
            y: -40,
            count: 110,
            power: 6,
            spread: Math.PI * 2,
            gravity: 0.08,
            duration: 6500,
          })
        }, 260)
      }, 150)
    }
  }

  const reset = () => {
    breakingRef.current = false
    setBroken(false)
    setHits(0)
    const el = swingRef.current
    if (el) {
      gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })
    }
  }

  const status = damage === 0 ? 'Intacta' : damage < 0.4 ? 'Aguantando' : damage < 0.75 ? 'Crujiendo' : '¡Casi!'

  return (
    <section
      id="pinata"
      ref={sectionRef}
      data-scene="pinata"
      className="grain relative overflow-hidden bg-[linear-gradient(180deg,#2C0A2A_0%,#5D1031_32%,#8E1F2B_62%,#C2572F_100%)] py-24 text-cream sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(242,182,60,0.28),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(40,8,20,0.65),transparent_55%)]" />
      <div className="intro-flags absolute left-0 right-0 top-0 opacity-95">
        <PapelPicado flags={11} />
      </div>
      <div className="absolute left-[-4%] right-[-4%] top-[8%] opacity-90">
        <StringLights bulbs={14} />
      </div>
      <Particles count={26} />

      {/* side sockets for depth */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-52 w-52 rounded-full bg-vino/40 blur-3xl md:block" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-naranja/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="pinata-heading text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-amarillo/80">
            <span className="h-px w-8 bg-amarillo/35" />
            <span className="eyebrow text-cream/65">La piñata · juego 01</span>
            <span className="h-px w-8 bg-amarillo/35" />
          </div>
          <h2 className="font-display text-[clamp(2.4rem,6.4vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
            Every birthday
            <br />
            needs a <span className="italic text-amarillo">piñata.</span>
          </h2>
          <p className="pinata-sub mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-cream/70 sm:text-base">
            Click the piñata repeatedly to break it! Then brace yourself for the confetti.
          </p>
        </div>

        <div className="relative mx-auto mt-2 flex min-h-[440px] w-full max-w-2xl flex-col items-center justify-center sm:min-h-[500px]">
          <div className="pinata-float absolute inset-0 flex justify-center">
            <motion.div
              animate={broken ? { opacity: 0, scale: 1.12, y: -32 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(58vw,290px)] sm:w-[min(40vw,330px)]"
            >
              <div ref={swingRef} className="pinata-wrap">
                <button
                  type="button"
                  onClick={handleHit}
                  className="pinata-btn block w-full rounded-full focus-visible:ring-4 focus-visible:ring-amarillo/70"
                  aria-label={`Hit the piñata. ${Math.max(0, HITS_TO_BREAK - hits)} hits remaining.`}
                  aria-disabled={broken}
                >
                  <span className="block transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]">
                    <PinataArt
                      hits={hits}
                      maxHits={HITS_TO_BREAK}
                      className="h-auto w-full drop-shadow-[0_36px_50px_rgba(20,4,12,0.55)]"
                    />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {pum > 0 && !broken && (
              <motion.span
                key={pum}
                initial={{ opacity: 0, scale: 0.5, rotate: -12, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.15, 1, 0.9], rotate: [12, 0, -4], y: -64 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="pointer-events-none absolute left-1/2 top-[44%] z-20 -translate-x-1/2 font-display text-3xl font-black uppercase text-amarillo drop-shadow-[0_4px_0_rgba(108,18,32,0.8)] sm:text-4xl"
              >
                ¡Pum!
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {broken && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-1/2 z-20 mx-auto w-full max-w-xl -translate-y-1/2 px-2"
              >
                <div className="paper-texture relative rounded-[6px] border border-[#b25a36]/40 px-5 py-7 text-center text-ink shadow-[0_50px_100px_-24px_rgba(0,0,0,0.8)] sm:px-10 sm:py-9">
                  <div className="pointer-events-none absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-2 bg-cream/60" />
                  <p className="eyebrow text-terracotta/80">Piñata destroyed · friendship intact</p>
                  <h3 className="mt-3 font-display text-[clamp(2rem,5.4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-vino">
                    ¡Feliz cumpleaños,
                    <br />
                    <span className="italic">Roberto!</span>
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-[11px] font-semibold uppercase leading-relaxed tracking-[0.13em] text-ink/65 sm:text-[12px]">
                    Congratulations! You unlocked another year of being everyone&apos;s favorite chef.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button type="button" onClick={reset} className="btn-outline border-ink/30 text-ink hover:bg-vino hover:text-cream">
                      <RotateCcw className="h-3.5 w-3.5" /> Otra vez
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('amigos')}
                      className="btn-outline border-ink/30 text-ink hover:bg-vino hover:text-cream"
                    >
                      Los amigos <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <StarSeal className="mx-auto mt-4 h-4 w-4 text-terracotta/50" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!broken && (
            <div className="absolute bottom-0 left-1/2 w-full max-w-md -translate-x-1/2">
              <div className="mb-2 flex items-end justify-between text-[9px] uppercase tracking-[0.24em] text-cream/55">
                <span>
                  Damage · <span className="text-amarillo/90">{status}</span>
                </span>
                <span>
                  {hits} / {HITS_TO_BREAK} whacks
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full border border-cream/15 bg-night/40">
                <motion.div
                  animate={{ width: `${damage * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1F9E96,#F2B63C,#E8752A,#8E1F2B)]"
                />
                <div className="pointer-events-none absolute inset-0 flex justify-between px-[11%]">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className="h-full w-px bg-cream/15" />
                  ))}
                </div>
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 text-center font-script text-lg text-cream/45">
                <Volume2 className="h-3.5 w-3.5" /> Turn sound on for the full fiesta
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.25em] text-cream/40">
          <span className="flex items-center gap-2">
            <PartyPopper className="h-3.5 w-3.5" /> no piñatas were harmed beyond repair
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-cream/25 sm:block" />
          <span className="font-script text-base normal-case tracking-normal text-cream/55">dale, dale, dale</span>
        </div>
      </div>
    </section>
  )
}
