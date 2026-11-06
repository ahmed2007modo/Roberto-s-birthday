import { useMemo } from 'react'

/* ------------------------------------------------------------------ */
/* Papel picado                                                        */
/* ------------------------------------------------------------------ */

const FLAG_OUTLINE =
  'M0 0 H100 V116 L87.5 106 L75 116 L62.5 106 L50 116 L37.5 106 L25 116 L12.5 106 L0 116 Z'
const FLAG_HOLES =
  'M50 16 l11 14 -11 14 -11 -14 Z ' +
  'M24 48 l7 9 -7 9 -7 -9 Z M76 48 l7 9 -7 9 -7 -9 Z ' +
  'M50 62 l8 10 -8 10 -8 -10 Z ' +
  'M25 86 l6 8 -6 8 -6 -8 Z M75 86 l6 8 -6 8 -6 -8 Z'

const FLAG_COLORS = ['#E8752A', '#1F9E96', '#F2B63C', '#8E1F2B', '#1F3F8F', '#C2572F']

export function PapelPicado({
  className = '',
  flags = 9,
  flip = false,
}: {
  className?: string
  flags?: number
  flip?: boolean
}) {
  const items = useMemo(
    () =>
      Array.from({ length: flags }, (_, i) => ({
        x: 40 + i * 128,
        color: FLAG_COLORS[i % FLAG_COLORS.length],
        delay: -(i * 0.43),
        scale: 0.86 + ((i * 7) % 3) * 0.05,
      })),
    [flags],
  )

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${flags * 128 + 80} 200`}
        className="h-auto w-full overflow-visible"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path
          d={`M0 14 Q ${(flags * 128 + 80) / 2} 52 ${flags * 128 + 80} 14`}
          fill="none"
          stroke="rgba(42,23,16,0.42)"
          strokeWidth="2"
        />
        {items.map((f, i) => (
          <g
            key={i}
            className="sway"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'top center',
              animationDelay: `${f.delay}s`,
              animationDuration: `${5 + (i % 4) * 0.8}s`,
            }}
          >
            <line x1={f.x + 48} y1="26" x2={f.x + 48} y2="44" stroke="rgba(42,23,16,0.5)" strokeWidth="1.5" />
            <g transform={`translate(${f.x} 42) scale(${f.scale})`}>
              <path
                d={`${FLAG_OUTLINE} ${FLAG_HOLES}`}
                fill={f.color}
                fillRule="evenodd"
                opacity="0.94"
              />
              <path d={FLAG_OUTLINE} fill="none" stroke="rgba(42,23,16,0.22)" strokeWidth="1" />
              <path d="M0 0 H100" stroke="rgba(255,250,238,0.35)" strokeWidth="2" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* String lights                                                       */
/* ------------------------------------------------------------------ */

export function StringLights({ className = '', bulbs = 13 }: { className?: string; bulbs?: number }) {
  const list = useMemo(() => {
    const width = 1200
    return Array.from({ length: bulbs }, (_, i) => {
      const t = (i + 1) / (bulbs + 1)
      const x = t * width
      const sag = Math.sin(Math.PI * t) * 66
      const y = 18 + sag
      return { x, y, delay: -(i * 0.37) }
    })
  }, [bulbs])

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 120" className="h-auto w-full overflow-visible">
        <path d="M0 18 Q600 156 1200 18" fill="none" stroke="rgba(42,23,16,0.4)" strokeWidth="2" />
        {list.map((b, i) => (
          <g key={i}>
            <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + 11} stroke="rgba(42,23,16,0.6)" strokeWidth="2" />
            <circle cx={b.x} cy={b.y + 20} r="16" fill="rgba(242,182,60,0.16)" />
            <circle
              cx={b.x}
              cy={b.y + 20}
              r="6"
              fill={i % 3 === 0 ? '#FFE6A3' : '#F2B63C'}
              className="twinkle"
              style={{ animationDelay: `${b.delay}s`, filter: 'drop-shadow(0 0 7px rgba(242,182,60,0.95))' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Floating dust / confetti bits                                       */
/* ------------------------------------------------------------------ */

export function Particles({ count = 18, className = '' }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280
        const rand = seed / 233280
        const seed2 = (i * 4177 + 12345) % 65536
        const rand2 = seed2 / 65536
        return {
          left: `${(rand * 100).toFixed(2)}%`,
          size: 3 + rand2 * 7,
          duration: 11 + rand * 12,
          delay: -(rand2 * 18),
          opacity: 0.25 + rand2 * 0.5,
          color: FLAG_COLORS[i % FLAG_COLORS.length],
          round: rand2 > 0.6,
        }
      }),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="drift absolute bottom-0 block"
          style={{
            left: d.left,
            width: d.size,
            height: d.round ? d.size : d.size * 0.45,
            background: d.color,
            opacity: d.opacity,
            borderRadius: d.round ? '50%' : 2,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Talavera divider + corner florals                                   */
/* ------------------------------------------------------------------ */

export function TalaveraDivider({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <div className={`relative flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className={`h-px flex-1 ${tone === 'dark' ? 'bg-ink/20' : 'bg-cream/25'}`} />
      <svg viewBox="0 0 72 28" className="h-7 w-16">
        <path d="M36 3c4 6 9 8 15 9-6 1-11 3-15 9-4-6-9-8-15-9 6-1 11-3 15-9z" fill="#C2572F" />
        <circle cx="36" cy="12" r="3" fill="#F2B63C" />
        <path d="M8 12h8M56 12h8" stroke={tone === 'dark' ? '#2A1710' : '#F7EBD6'} strokeWidth="1" />
      </svg>
      <span className={`h-px flex-1 ${tone === 'dark' ? 'bg-ink/20' : 'bg-cream/25'}`} />
    </div>
  )
}

export function CornerFloral({
  className = '',
  color = '#C2572F',
  accent = '#F2B63C',
  leaf = '#1F9E96',
}: {
  className?: string
  color?: string
  accent?: string
  leaf?: string
}) {
  return (
    <svg viewBox="0 0 220 220" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g fill="none" stroke={leaf} strokeWidth="2.5" strokeLinecap="round">
        <path d="M6 214C42 170 46 122 34 74" />
        <path d="M34 132c-26-10-30-38-22-54 20 8 30 32 22 54z" fill={leaf} fillOpacity="0.14" />
        <path d="M40 104c-4-28 12-48 30-54 2 24-12 46-30 54z" fill={leaf} fillOpacity="0.18" />
        <path d="M28 164c-24 2-38-14-42-32 22-2 38 12 42 32z" fill={leaf} fillOpacity="0.12" />
      </g>
      <g>
        <circle cx="52" cy="52" r="7" fill={accent} />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="52"
            cy="52"
            rx="9"
            ry="18"
            fill={color}
            opacity="0.9"
            transform={`rotate(${deg} 52 52) translate(0 -16)`}
          />
        ))}
        <circle cx="52" cy="52" r="5" fill={accent} />
      </g>
      <g opacity="0.85">
        <circle cx="102" cy="30" r="4" fill={accent} />
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="102"
            cy="30"
            rx="5"
            ry="11"
            fill={color}
            opacity="0.7"
            transform={`rotate(${deg} 102 30) translate(0 -9)`}
          />
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Small labels                                                        */
/* ------------------------------------------------------------------ */

export function SceneLabel({
  number,
  children,
  light = false,
  className = '',
}: {
  number: string
  children: React.ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-semibold tracking-widest ${
          light ? 'border-cream/35 text-cream/80' : 'border-ink/25 text-ink/70'
        }`}
      >
        {number}
      </span>
      <span className={`eyebrow ${light ? 'text-cream/75' : 'text-ink/65'}`}>{children}</span>
    </div>
  )
}

export function StarSeal({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M50 4l12.9 27.1 29.7 3.3-22.2 20.2 6.1 29.3L50 69.6 23.5 83.9l6.1-29.3L7.4 34.4l29.7-3.3z"
        fill="currentColor"
      />
    </svg>
  )
}
