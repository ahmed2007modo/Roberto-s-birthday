import { useEffect, useRef } from 'react'

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

type Rocket = {
  x: number
  y: number
  vy: number
  targetY: number
  color: string
  trail: { x: number; y: number }[]
}

const COLORS = ['#F2B63C', '#FFE9AE', '#E8752A', '#1F9E96', '#7FB2FF', '#FF8A8A', '#F7EBD6']

export function Fireworks({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    const rockets: Rocket[] = []
    const sparks: Spark[] = []
    let raf = 0
    let visible = false
    let last = 0
    let nextLaunch = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const launch = () => {
      rockets.push({
        x: width * (0.12 + Math.random() * 0.76),
        y: height + 12,
        vy: -(5.2 + Math.random() * 2.6),
        targetY: height * (0.12 + Math.random() * 0.34),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      })
    }

    const explode = (rocket: Rocket) => {
      const count = 56 + Math.floor(Math.random() * 34)
      const base = Math.random() * Math.PI * 2
      for (let i = 0; i < count; i += 1) {
        const angle = base + (i / count) * Math.PI * 2 + Math.random() * 0.12
        const speed = 1.1 + Math.random() * 4.4
        sparks.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 55 + Math.random() * 55,
          color: Math.random() < 0.22 ? COLORS[1] : rocket.color,
          size: 0.9 + Math.random() * 1.6,
        })
      }
    }

    const frame = (now: number) => {
      if (!visible) return
      const delta = Math.min(2.4, (now - last) / 16.67) || 1
      last = now

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      if (now > nextLaunch) {
        launch()
        if (Math.random() > 0.55) launch()
        nextLaunch = now + 1500 + Math.random() * 2200
      }

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i]
        r.y += r.vy * delta
        r.vy += 0.012 * delta
        r.trail.push({ x: r.x, y: r.y })
        if (r.trail.length > 14) r.trail.shift()

        ctx.beginPath()
        ctx.strokeStyle = r.color
        ctx.lineWidth = 1.6
        ctx.globalAlpha = 0.70
        ctx.moveTo(r.trail[0].x, r.trail[0].y)
        for (const point of r.trail) ctx.lineTo(point.x, point.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.fillStyle = '#FFF6D0'
        ctx.globalAlpha = 1
        ctx.arc(r.x, r.y, 1.9, 0, Math.PI * 2)
        ctx.fill()

        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r)
          rockets.splice(i, 1)
        }
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i]
        s.life += delta
        if (s.life >= s.maxLife) {
          sparks.splice(i, 1)
          continue
        }
        s.vx *= 0.986
        s.vy *= 0.986
        s.vy += 0.045 * delta
        s.x += s.vx * delta
        s.y += s.vy * delta
        const alpha = 1 - s.life / s.maxLife
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * (0.6 + alpha * 0.6), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!visible) {
        visible = true
        last = performance.now()
        nextLaunch = performance.now() + 900
        raf = requestAnimationFrame(frame)
      }
    }

    const stop = () => {
      visible = false
      cancelAnimationFrame(raf)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start()
        else stop()
      },
      { threshold: 0.06 },
    )
    io.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />
}
