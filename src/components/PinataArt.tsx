type Props = {
  hits: number
  maxHits: number
  className?: string
}

function starPath(cx: number, cy: number, outer: number, inner: number, points = 5) {
  const coords: string[] = []
  for (let i = 0; i < points * 2; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / points
    const radius = i % 2 === 0 ? outer : inner
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    coords.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return `${coords.join(' ')} Z`
}

const STAR = starPath(200, 248, 152, 68)
const BANDS = ['#8E1F2B', '#C2572F', '#E8752A', '#F2B63C', '#1F9E96', '#1F3F8F', '#C2572F']
const STREAMERS = ['#F2B63C', '#1F9E96', '#E8752A', '#1F3F8F']

export function PinataArt({ hits, maxHits, className = '' }: Props) {
  const damage = Math.min(1, hits / maxHits)
  const cracks = [
    { d: 'M142 186l30 22-16 30 22 17', threshold: 0.18 },
    { d: 'M264 152l-20 34 24 26', threshold: 0.34 },
    { d: 'M206 238l-28 30 14 26-18 16', threshold: 0.5 },
    { d: 'M312 260l-30 26 20 24', threshold: 0.65 },
    { d: 'M114 270l26 18-8 28', threshold: 0.8 },
  ]

  return (
    <svg viewBox="0 0 400 540" className={className} aria-hidden="true">
      <defs>
        <clipPath id="pinata-star-clip">
          <path d={STAR} />
        </clipPath>
        <radialGradient id="pinata-shade" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#3A0610" stopOpacity="0.46" />
        </radialGradient>
        <filter id="pinata-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* rope */}
      <g>
        <path d="M200 0v112" stroke="#C9A36A" strokeWidth="7" strokeLinecap="round" />
        <path d="M200 0v112" stroke="#F2D9A6" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
        <path d="M200 98c0-18 26-18 26 4s-26 22-26 4" fill="none" stroke="#C9A36A" strokeWidth="5" />
      </g>

      <g filter="url(#pinata-glow)">
        {/* star body */}
        <g clipPath="url(#pinata-star-clip)">
          {BANDS.map((color, i) => (
            <rect
              key={color + i}
              x="30"
              y={100 + i * 44}
              width="340"
              height="46"
              fill={color}
            />
          ))}
          {/* fringed band edges */}
          {BANDS.slice(0, -1).map((_, i) => {
            const y = 144 + i * 44
            return (
              <g key={i} opacity="0.8">
                <path d={`M30 ${y}H370`} stroke="#F7EBD6" strokeWidth="1.4" strokeDasharray="1 5" />
                {Array.from({ length: 22 }, (__, j) => (
                  <path
                    key={j}
                    d={`M${38 + j * 15} ${y - 7}l4 7-4 7`}
                    fill="none"
                    stroke="#2A1710"
                    strokeWidth="1"
                    opacity="0.28"
                  />
                ))}
              </g>
            )
          })}
          {/* paper-cut diamonds */}
          <g fill="#F7EBD6" opacity="0.42">
            {[
              [150, 170],
              [250, 170],
              [116, 258],
              [288, 258],
              [200, 210],
              [170, 300],
              [236, 300],
              [200, 350],
            ].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 7}l7 7-7 7-7-7z`} />
            ))}
          </g>
          {/* crinkle texture */}
          <g stroke="#F7EBD6" strokeWidth="1" opacity="0.16">
            {Array.from({ length: 18 }, (_, i) => (
              <path key={i} d={`M${70 + i * 16} 108l-8 ${250 + (i % 3) * 12}`} />
            ))}
          </g>
          <rect x="30" y="100" width="340" height="320" fill="url(#pinata-shade)" />
        </g>

        {/* concentric fringe rings */}
        {[0.82, 0.64, 0.46].map((scale, i) => (
          <path
            key={i}
            d={starPath(200, 248, 152 * scale, 68 * scale)}
            fill="none"
            stroke={i % 2 === 0 ? '#F7EBD6' : '#2A1710'}
            strokeOpacity={i % 2 === 0 ? 0.6 : 0.25}
            strokeWidth="2"
            strokeDasharray="2 6"
          />
        ))}

        {/* cone facets */}
        <g fill="#FFFFFF" opacity="0.13">
          <path d="M200 248L306 219 290 302z" />
          <path d="M200 248L124 320 74 263z" />
        </g>

        <path d={STAR} fill="none" stroke="#4C0B15" strokeWidth="5" strokeLinejoin="round" />
        <path d={STAR} fill="none" stroke="#F2B63C" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />

        {/* cracks */}
        {cracks.map((crack, i) => (
          <path
            key={i}
            d={crack.d}
            fill="none"
            stroke="#2A1710"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={damage >= crack.threshold ? 0.85 : 0}
            style={{ transition: 'opacity 0.35s ease' }}
          />
        ))}
        {damage > 0.72 && (
          <g stroke="#F7EBD6" strokeWidth="2" opacity="0.7">
            <path d="M236 330l12 16-8 12M164 196l-12 16 8 10" />
          </g>
        )}
      </g>

      {/* streamers */}
      {STREAMERS.map((color, i) => (
        <g key={color} opacity="0.95" style={{ transformOrigin: `${i % 2 === 0 ? 112 : 288}px 371px` }}>
          <path
            d={
              i % 2 === 0
                ? `M112 366c-16 26 12 40-2 66 14 12 4 38 14 52`
                : `M288 366c16 26-12 40 2 66-14 12-4 38-14 52`
            }
            fill="none"
            stroke={color}
            strokeWidth={i === 0 ? 10 : 7}
            strokeLinecap="round"
          />
        </g>
      ))}
      <path d="M200 396c-8 22 4 34-2 48" stroke="#F2B63C" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  )
}
