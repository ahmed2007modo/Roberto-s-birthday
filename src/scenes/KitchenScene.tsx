import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Flame, UtensilsCrossed } from 'lucide-react'
import { SceneLabel, StarSeal, TalaveraDivider } from '../components/Decor'
import { ChiliRistra } from '../components/Botanical'
import { DishArt, FlameArt, IngredientArt, PanArt, type IngredientKind } from '../components/KitchenArt'
import { fiestaAudio } from '../lib/audio'

gsap.registerPlugin(ScrollTrigger)

const ingredients: {
  kind: IngredientKind
  name: string
  className: string
  size: string
}[] = [
  { kind: 'pepper', name: 'Chile', className: 'left-[12%] top-[2%]', size: 'w-[11%] min-w-[52px]' },
  { kind: 'tomato', name: 'Jitomate', className: 'left-[0%] top-[34%]', size: 'w-[13%] min-w-[58px]' },
  { kind: 'avocado', name: 'Aguacate', className: 'right-[6%] top-[8%]', size: 'w-[15%] min-w-[64px]' },
  { kind: 'tortilla', name: 'Tortillas', className: 'right-[0%] top-[42%]', size: 'w-[15%] min-w-[64px]' },
  { kind: 'onion', name: 'Cebolla', className: 'left-[6%] bottom-[4%]', size: 'w-[14%] min-w-[58px]' },
  { kind: 'lime', name: 'Limón', className: 'right-[17%] bottom-[2%]', size: 'w-[10%] min-w-[46px]' },
]

const menu = [
  { name: "Roberto's Special", note: 'Trust the chef. Always.', price: '♥' },
  { name: 'El Amigo Tacos', note: 'Three tacos, zero judgment.', price: '♥♥' },
  { name: 'The Chill Combo', note: 'Slow-cooked, stress-free.', price: '♥♥♥' },
  { name: 'Birthday Special', note: 'Extra candles. Extra salsa.', price: '★' },
]

export function KitchenScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const panRef = useRef<HTMLDivElement>(null)
  const [order, setOrder] = useState<string | null>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.kitchen-line > span', { yPercent: 110 })
        gsap.set('.kitchen-intro', { opacity: 0, y: 16 })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'top 38%',
              scrub: true,
            },
          })
          .to('.kitchen-line > span', { yPercent: 0, duration: 1, stagger: 0.12, ease: 'none' })
          .to('.kitchen-intro', { opacity: 1, y: 0, duration: 0.7, ease: 'none' }, 0.2)
      }, sectionRef)
      return () => ctx.revert()
    })

    const buildCookTimeline = (scrollTrigger: ScrollTrigger.Vars) => {
      const pan = panRef.current
      if (!pan) return null
      const target = (el: HTMLElement) => {
        const p = pan.getBoundingClientRect()
        const r = el.getBoundingClientRect()
        return {
          x: p.left + p.width * 0.46 - (r.left + r.width / 2),
          y: p.top + p.height * 0.35 - (r.top + r.height / 2),
        }
      }

      const tl = gsap.timeline({ scrollTrigger })
      tl.fromTo('.k-table', { scale: 0.94, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
        .fromTo('.k-pan', { y: 60, opacity: 0, rotate: -4 }, { y: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'power2.out' }, 0.1)
        .fromTo('.menu-card', { x: 70, y: 30, opacity: 0, rotate: 5 }, { x: 0, y: 0, opacity: 1, rotate: 1.5, duration: 0.9, ease: 'power2.out' }, 0.25)
        .fromTo('.k-flame', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.35)

      document.querySelectorAll<HTMLElement>('.k-ingredient').forEach((el, i) => {
        tl.to(
          el,
          {
            x: () => target(el).x,
            y: () => target(el).y,
            scale: 0.22,
            rotate: i % 2 === 0 ? 28 : -24,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.in',
          },
          0.65 + i * 0.13,
        )
      })

      tl.to('.k-pan', { rotate: -2.2, y: -8, duration: 0.11, repeat: 5, yoyo: true, ease: 'none' }, 1.55)
        .fromTo('.k-steam', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.65)
        .fromTo(
          '.k-dish',
          { opacity: 0, y: 50, scale: 0.72, rotate: -4 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1, ease: 'power3.out' },
          2.0,
        )
        .fromTo('.k-listo', { opacity: 0, y: 14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, 2.5)
        .fromTo('.menu-row', { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 }, 1.4)
        .to('.k-cook-hint', { opacity: 1, duration: 0.3 }, 2.7)

      return tl
    }

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.k-dish', { opacity: 0 })
        gsap.set('.k-steam', { opacity: 0 })
        gsap.set('.menu-card', { opacity: 0 })
        gsap.set('.menu-row', { opacity: 0 })
        gsap.set('.k-table', { opacity: 0 })
        gsap.set('.k-pan', { opacity: 0 })
        gsap.set('.k-flame', { opacity: 0 })
        gsap.set('.k-listo', { opacity: 0 })
        gsap.set('.k-cook-hint', { opacity: 0 })

        buildCookTimeline({
          trigger: pinRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.k-dish', { opacity: 0 })
        gsap.set('.k-steam', { opacity: 0 })
        gsap.set('.menu-card', { opacity: 0 })
        gsap.set('.menu-row', { opacity: 0 })
        gsap.set('.k-table', { opacity: 0 })
        gsap.set('.k-pan', { opacity: 0 })
        gsap.set('.k-flame', { opacity: 0 })
        gsap.set('.k-listo', { opacity: 0 })
        gsap.set('.k-cook-hint', { opacity: 0 })

        buildCookTimeline({
          trigger: '.kitchen-stage',
          start: 'top 82%',
          end: '+=110%',
          scrub: true,
        })
      }, sectionRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  const chooseDish = (name: string, event: React.MouseEvent) => {
    setOrder(name)
    fiestaAudio.hit()
    const el = event.currentTarget as HTMLElement
    gsap.fromTo(el, { scale: 0.98 }, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.45)' })
  }

  return (
    <section
      id="cocina"
      ref={sectionRef}
      data-scene="cocina"
      className="relative overflow-hidden bg-[#0F3B44] text-cream"
    >
      <div className="pointer-events-none absolute inset-0 tile-dark opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(242,182,60,0.18),transparent_38%),radial-gradient(circle_at_90%_80%,rgba(232,117,42,0.12),transparent_40%)]" />

      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center px-5 py-24 sm:px-8 lg:py-14"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 talavera-border opacity-60" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="relative">
            <SceneLabel number="04" light className="mb-4">
              La cocina de Roberto
            </SceneLabel>

            <h2 className="font-display text-[clamp(2.2rem,4.6vw,4.4rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
              <span className="mask-line kitchen-line">
                <span>La cocina</span>
              </span>
              <span className="mask-line kitchen-line">
                <span className="italic text-amarillo">de Roberto.</span>
              </span>
            </h2>

            <p className="kitchen-intro mt-4 max-w-md text-sm font-light leading-relaxed text-cream/60 sm:text-base">
              The heart of the house. Where the magic happens — and by magic, we mean the food.
            </p>

            <div className="kitchen-stage relative mt-4 h-[310px] w-full sm:h-[360px] lg:mt-2 lg:h-[42vh] lg:min-h-[330px]">
              <ChiliRistra className="absolute -left-1 top-0 h-[38%] opacity-90 sm:h-[44%]" />

              {/* table surface */}
              <div className="k-table absolute inset-x-[-4%] bottom-0 h-[46%] wood-table rounded-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#D9A26A]/50" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(180deg,transparent,rgba(35,12,5,0.5))]" />
                <div className="absolute left-[8%] top-[28%] h-2 w-16 rounded-full bg-[#6C3A20]/50" />
                <div className="absolute right-[12%] top-[46%] h-2 w-24 rounded-full bg-[#6C3A20]/40" />
              </div>

              {/* ingredients */}
              {ingredients.map((ing, i) => (
                <div
                  key={ing.kind}
                  className={`k-ingredient group/ing absolute z-10 ${ing.className} ${ing.size}`}
                  style={{ animationDelay: `${i * -0.8}s` }}
                >
                  <div className="float relative transition-transform duration-300 group-hover/ing:scale-110" style={{ animationDelay: `${i * -1.1}s` }}>
                    <IngredientArt
                      kind={ing.kind}
                      className="h-auto w-full drop-shadow-[0_14px_14px_rgba(0,0,0,0.35)]"
                    />
                    <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream/90 px-2 py-0.5 font-script text-xs text-ink opacity-0 transition-opacity duration-300 group-hover/ing:opacity-100">
                      {ing.name}
                    </span>
                  </div>
                </div>
              ))}

              {/* steam */}
              <div className="pointer-events-none absolute bottom-[42%] left-1/2 z-20 h-20 w-40 -translate-x-1/2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="k-steam steam absolute bottom-0 h-12 w-12 rounded-full bg-[#FFF7E0]/40"
                    style={{ left: `${10 + i * 22}%` }}
                  />
                ))}
              </div>

              {/* flame */}
              <div className="k-flame absolute bottom-[8%] left-1/2 z-10 w-[44%] -translate-x-1/2 opacity-80 sm:w-[40%]">
                <FlameArt className="h-auto w-full" />
              </div>

              {/* pan */}
              <div ref={panRef} className="k-pan absolute bottom-[10%] left-1/2 z-20 w-[64%] max-w-[440px] -translate-x-1/2 sm:w-[58%]">
                <PanArt className="float h-auto w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]" />
              </div>

              {/* finished dish */}
              <div className="k-dish pointer-events-none absolute bottom-[26%] left-1/2 z-30 w-[58%] max-w-[400px] -translate-x-1/2 sm:w-[52%]">
                <DishArt className="h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,0.4)]" />
              </div>

              <div className="k-listo pointer-events-none absolute right-[3%] top-[34%] z-30 rotate-6 text-center">
                <span className="font-script text-3xl text-amarillo sm:text-4xl">¡Listo!</span>
                <svg viewBox="0 0 80 30" className="mx-auto h-5 w-16 text-amarillo/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4c22 0 44 8 66 20M62 21l8 3-2-8" />
                </svg>
              </div>
            </div>

            <div className="k-cook-hint mt-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-cream/35">
              <Flame className="h-3 w-3" />
              Scroll to cook · hover the ingredients
            </div>
          </div>

          {/* menu */}
          <div className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:justify-self-end">
            <div className="menu-card archive-paper relative rotate-[1.5deg] rounded-[3px] border border-[#b99a70] p-1 text-ink shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75)]">
              <div className="pointer-events-none absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-2deg] bg-cream/60 shadow-sm" />
              <div className="border border-dashed border-[#8E1F2B]/35 px-4 py-5 sm:px-6 sm:py-6">
                <div className="text-center">
                  <p className="font-script text-2xl leading-none text-terracotta">Restaurante</p>
                  <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-black uppercase leading-none tracking-[0.02em] text-vino">
                    Roberto
                  </h3>
                  <div className="mt-2 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.28em] text-ink/45">
                    <span className="h-px w-5 bg-ink/20" /> cocina casera <span className="h-px w-5 bg-ink/20" />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                    <StarSeal className="h-3.5 w-3.5 text-terracotta" />
                    Today&apos;s Special
                    <StarSeal className="h-3.5 w-3.5 text-terracotta" />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  {menu.map((item) => {
                    const selected = order === item.name
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={(e) => chooseDish(item.name, e)}
                        aria-pressed={selected}
                        className={`menu-row group flex w-full items-start justify-between gap-3 rounded-sm px-2 py-2 text-left ${
                          selected ? 'bg-terracotta/10' : ''
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 font-display text-[15px] font-semibold leading-tight text-ink/90">
                            {item.name}
                            {selected && <Check className="h-3.5 w-3.5 text-turquesa" />}
                          </span>
                          <span className="mt-0.5 block text-[10px] leading-snug text-ink/50">{item.note}</span>
                        </span>
                        <span className="mt-0.5 shrink-0 font-script text-sm text-terracotta/80">{item.price}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="my-4 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(42,23,16,0.25)_0_4px,transparent_4px_8px)]" />

                <p className="text-center text-[10.5px] font-light leading-relaxed text-ink/65 sm:text-[11px]">
                  Five-star hospitality. Unlimited food. Absolutely no reservations needed.
                </p>

                <div className="mt-3 min-h-[24px] text-center">
                  <p className="font-script text-lg leading-tight text-vino/80">
                    {order ? `${order} — pedido confirmado, jefe.` : 'Pasa, siéntate. Ya estás invitado.'}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-full border-2 border-vino/40 bg-cream/50 text-center font-display text-[8px] font-bold uppercase leading-tight tracking-[0.1em] text-vino/70">
                Sin
                <br />
                reservas
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-7xl items-center gap-3 text-cream/40 lg:mt-4">
          <UtensilsCrossed className="h-4 w-4 shrink-0" />
          <TalaveraDivider tone="light" className="flex-1" />
          <p className="hidden shrink-0 font-script text-lg text-cream/55 sm:block">
            feeding people is his love language
          </p>
        </div>
      </div>
    </section>
  )
}
