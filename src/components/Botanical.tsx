type PlantProps = {
  variant?: 'agave' | 'cactus' | 'monstera'
  className?: string
  potColor?: string
}

/** Hand-drawn-looking potted plants used across the courtyard, friends and finale scenes. */
export function PottedPlant({ variant = 'agave', className = '', potColor = '#B8512E' }: PlantProps) {
  const leaves =
    variant === 'cactus' ? (
      <g>
        <path
          d="M100 118V52c0-18 11-30 26-30s26 12 26 30v66"
          fill="#2F7F63"
          stroke="#245F4B"
          strokeWidth="3"
        />
        <path
          d="M100 90c-20 0-28-12-28-30 0-12 6-20 15-20 8 0 13 6 13 15v20"
          fill="#3B9474"
          stroke="#245F4B"
          strokeWidth="3"
        />
        <path
          d="M152 104c20 0 28-12 28-30 0-12-6-20-15-20-8 0-13 6-13 15v20"
          fill="#3B9474"
          stroke="#245F4B"
          strokeWidth="3"
        />
        <g stroke="#245F4B" strokeWidth="2" opacity="0.55">
          <path d="M116 60v50M128 54v58M140 62v48" />
        </g>
        <path d="M126 22v-8M126 8l-5 6M126 8l5 6" stroke="#F2B63C" strokeWidth="3" fill="none" />
      </g>
    ) : variant === 'monstera' ? (
      <g>
        {[
          { d: 'M126 118C86 104 72 70 84 42c28 2 54 26 54 62', fill: '#1F7A5E', rot: -8 },
          { d: 'M128 118c40-14 54-48 42-76-28 2-54 26-54 62', fill: '#2B8C6B', rot: 6 },
          { d: 'M126 110C100 84 104 46 128 24c22 18 28 54 10 82', fill: '#256F55', rot: 0 },
        ].map((leaf, i) => (
          <g key={i} transform={`rotate(${leaf.rot} 126 118)`}>
            <path d={leaf.d} fill={leaf.fill} stroke="#1A5943" strokeWidth="2.5" />
            <path d={leaf.d.replace('C', 'L').replace('c', 'l')} fill="none" opacity="0.35" />
          </g>
        ))}
        <g stroke="#F7EBD6" strokeWidth="3" strokeLinecap="round" opacity="0.5">
          <path d="M112 74l8 10M138 58l6 12M100 96l9 6M146 90l7 8" />
        </g>
      </g>
    ) : (
      <g>
        {[-46, -26, -8, 10, 28, 46].map((deg, i) => (
          <path
            key={deg}
            d="M126 120C110 88 106 58 122 24c20 26 26 58 10 92"
            fill={i % 2 ? '#3E8D70' : '#2E765C'}
            stroke="#215A46"
            strokeWidth="2.4"
            transform={`rotate(${deg} 126 120)`}
          />
        ))}
        <circle cx="126" cy="120" r="8" fill="#F2B63C" />
      </g>
    )

  return (
    <svg viewBox="0 0 252 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`pot-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={potColor} />
          <stop offset="100%" stopColor="#7C341E" />
        </linearGradient>
      </defs>
      {leaves}
      <g>
        <path d="M78 170h96l-10 68c-1 8-8 14-16 14h-44c-8 0-15-6-16-14z" fill={`url(#pot-${variant})`} />
        <rect x="70" y="158" width="112" height="22" rx="7" fill={potColor} />
        <rect x="70" y="158" width="112" height="8" rx="4" fill="#E07A4B" opacity="0.7" />
        <g fill="#F2B63C" opacity="0.85">
          <path d="M126 192l7 9-7 9-7-9z" />
          <circle cx="102" cy="220" r="3" />
          <circle cx="150" cy="220" r="3" />
          <path d="M126 212l5 6-5 6-5-6z" opacity="0.6" />
        </g>
      </g>
    </svg>
  )
}

/** A little chilli ristra — a warm, very Mexican kitchen detail. */
export function ChiliRistra({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 220" className={className} aria-hidden="true">
      <path d="M45 4v26" stroke="#7A5B36" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 34 + i * 28
        const left = i % 2 === 0
        return (
          <g key={i} transform={`translate(${left ? 36 : 54} ${y}) rotate(${left ? -28 : 28})`}>
            <path d="M0 0c12 2 17 16 13 34-3 14-9 24-13 28-4-4-10-14-13-28C-17 16-12 2 0 0z" fill={i % 2 ? '#B5212E' : '#8E1F2B'} />
            <path d="M0 0c4 1 7 5 9 10" stroke="#E8752A" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M0 -4c-3-8-1-12 2-14" stroke="#4E7A44" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )
      })}
    </svg>
  )
}

export function SunRays({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g stroke="rgba(255,236,178,0.45)" strokeWidth="2">
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1="200" y1="200" x2="200" y2="20" transform={`rotate(${i * 15} 200 200)`} />
        ))}
      </g>
      <circle cx="200" cy="200" r="90" fill="rgba(255,235,175,0.55)" />
      <circle cx="200" cy="200" r="70" fill="rgba(255,244,207,0.8)" />
    </svg>
  )
}
