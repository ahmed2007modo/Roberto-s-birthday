import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IntroScene } from './scenes/IntroScene'
import { PersonalityScene } from './scenes/PersonalityScene'
import { MemoriesScene } from './scenes/MemoriesScene'
import { KitchenScene } from './scenes/KitchenScene'
import { PinataScene } from './scenes/PinataScene'
import { FriendsScene } from './scenes/FriendsScene'
import { FinaleScene } from './scenes/FinaleScene'
import { Nav } from './components/Nav'
import { AudioController } from './components/AudioController'
import { ScrollProgress } from './components/ScrollProgress'
import { Lightbox } from './components/Lightbox'
import { TalaveraDivider } from './components/Decor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedRef = useRef(false)
  const [entered, setEntered] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [runKey, setRunKey] = useState(0)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ScrollTrigger.config({ ignoreMobileResize: true })

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      lerp: reducedRef.current ? 1 : 0.09,
      smoothWheel: !reducedRef.current,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.35,
    })
    lenisRef.current = lenis
    lenis.scrollTo(0, { immediate: true, force: true })
    lenis.stop()

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    const refreshTimer = window.setTimeout(refresh, 350)
    if (document.fonts?.ready) void document.fonts.ready.then(refresh)

    return () => {
      window.clearTimeout(refreshTimer)
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (!entered || lightbox !== null) lenis.stop()
    else lenis.start()
  }, [entered, lightbox])

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 180)
    return () => window.clearTimeout(t)
  }, [runKey])

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.6, offset: 0 })
    } else {
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  }, [])

  const replay = useCallback(() => {
    setLightbox(null)
    setEntered(false)
    setRunKey((key) => key + 1)
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
      lenis.stop()
    }
    window.scrollTo(0, 0)
    window.setTimeout(() => ScrollTrigger.refresh(), 250)
  }, [])

  const openPhoto = useCallback((index: number) => {
    setLightbox(index)
  }, [])

  return (
    <div className="relative min-h-screen bg-cream">
      <ScrollProgress />
      <AudioController />
      <Nav show={entered} onNavigate={navigate} />

      <main key={runKey}>
        <IntroScene onEnter={() => setEntered(true)} onNavigate={navigate} />
        <PersonalityScene />
        <div className="relative z-10 bg-cream">
          <TalaveraDivider className="mx-auto max-w-5xl px-6 py-2" />
        </div>
        <MemoriesScene onOpenPhoto={openPhoto} />
        <KitchenScene />
        <PinataScene onNavigate={navigate} />
        <FriendsScene onOpenPhoto={openPhoto} />
        <FinaleScene onReplay={replay} onOpenPhoto={openPhoto} />
      </main>

      <Lightbox
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox(index)}
      />
    </div>
  )
}
