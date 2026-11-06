export type BurstOptions = {
  count?: number
  x?: number
  y?: number
  spread?: number
  power?: number
  gravity?: number
  scalar?: number
  colors?: string[]
  duration?: number
}

const FIESTA_COLORS = [
  '#F2B63C',
  '#E8752A',
  '#C2572F',
  '#8E1F2B',
  '#1F9E96',
  '#1F3F8F',
  '#F7EBD6',
  '#E8A0B4',
  '#6FB7A8',
]

type Piece = {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  rot: number
  vr: number
  color: string
  shape: number
  wobble: number
  wobbleSpeed: number
  life: number
  maxLife: number
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Full-screen paper confetti burst. Cleans itself up. */
export function launchConfetti(options: BurstOptions = {}) {
  if (typeof window === 'undefined') return
  if (prefersReduced()) return

  const {
    count = 160,
    x = window.innerWidth / 2,
    y = window.innerHeight / 2.6,
    spread = Math.PI * 2,
    power = 15,
    gravity = 0.13,
    scalar = 1,
    colors = FIESTA_COLORS,
    duration = 4200,
  } = options

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9000;'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr)
    canvas.height = Math.floor(window.innerHeight * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const pieces: Piece[] = []
  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread
    const velocity = (Math.random() * 0.65 + 0.35) * power
    const life = duration * (0.65 + Math.random() * 0.45)
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * velocity * (0.6 + Math.random() * 0.7),
      vy: Math.sin(angle) * velocity * (0.6 + Math.random() * 0.7),
      w: (5 + Math.random() * 8) * scalar,
      h: (8 + Math.random() * 13) * scalar,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() < 0.22 ? 1 : 0,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.06,
      life: 0,
      maxLife: life,
    })
  }

  let raf = 0
  const start = performance.now()
  const frame = (now: number) => {
    const elapsed = now - start
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let alive = 0
    for (const p of pieces) {
      p.life = elapsed
      if (p.life > p.maxLife) continue
      alive += 1
      p.vy += gravity * 0.4
      p.vx *= 0.992
      p.vy *= 0.995
      p.wobble += p.wobbleSpeed
      p.x += p.vx + Math.sin(p.wobble) * 0.9
      p.y += p.vy
      p.rot += p.vr
      const fade = 1 - Math.max(0, (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3))
      ctx.save()
      ctx.globalAlpha = Math.max(0, fade)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if (p.shape === 1) {
        ctx.beginPath()
        ctx.arc(0, 0, p.w * 0.42, 0, Math.PI * 2)
        ctx.fill()
      } else {
        const squash = Math.abs(Math.cos(p.wobble * 0.8))
        ctx.scale(1, 0.3 + squash * 0.7)
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      ctx.restore()
    }
    if (alive > 0) raf = requestAnimationFrame(frame)
    else finish()
  }

  const finish = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    canvas.remove()
  }

  raf = requestAnimationFrame(frame)
  window.setTimeout(finish, duration + 1400)
}

/** A little paper puff, used for each piñata hit. */
export function paperPuff(x: number, y: number, count = 12) {
  launchConfetti({
    x,
    y,
    count,
    power: 7,
    scalar: 0.6,
    gravity: 0.2,
    duration: 1100,
    spread: Math.PI * 1.2,
  })
}
