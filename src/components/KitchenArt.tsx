export type IngredientKind = 'tomato' | 'avocado' | 'pepper' | 'tortilla' | 'onion' | 'lime'

export function IngredientArt({ kind, className = '' }: { kind: IngredientKind; className?: string }) {
  if (kind === 'tomato') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <defs>
          <radialGradient id="tomato-red" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#F06A45" />
            <stop offset="70%" stopColor="#C2312E" />
            <stop offset="100%" stopColor="#8E1F2B" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="66" r="43" fill="url(#tomato-red)" stroke="#6C1220" strokeWidth="2.5" />
        <path d="M60 24l8 12 14-6-4 14 14 4-12 10 6 12-15-2-3 14-8-12-9 12-2-14-15 2 6-12-12-10 14-4-4-14 14 6z" fill="#3C7A4E" opacity="0.92" />
        <path d="M60 24v22M60 46l-13-9M60 46l13-9" stroke="#2F6340" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="45" cy="52" rx="10" ry="5" fill="#FFF7E0" opacity="0.4" transform="rotate(-30 45 52)" />
      </svg>
    )
  }
  if (kind === 'avocado') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <path
          d="M60 12c22 0 34 24 34 48 0 28-15 48-34 48S26 88 26 60c0-24 12-48 34-48z"
          fill="#2E765C"
          stroke="#1C513D"
          strokeWidth="2.5"
        />
        <path
          d="M60 22c17 0 26 20 26 39 0 22-11 38-26 38S34 83 34 61c0-19 9-39 26-39z"
          fill="#A8C66C"
        />
        <path d="M60 22c17 0 26 20 26 39 0 4 0 8-1 12-7-34-17-45-25-51z" fill="#C6DA8A" opacity="0.7" />
        <circle cx="60" cy="70" r="15" fill="#8E5A34" stroke="#6E4024" strokeWidth="2" />
        <circle cx="55" cy="65" r="4" fill="#B98558" opacity="0.7" />
        <path d="M40 40c-5 8-7 16-7 22" stroke="#F7EBD6" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
      </svg>
    )
  }
  if (kind === 'pepper') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <path
          d="M66 30c18 6 28 26 22 46-6 21-24 32-40 28-12-3-17-14-11-23 7-11 17-10 22-24 3-9 1-20 7-27z"
          fill="#D93A2B"
          stroke="#8E1F2B"
          strokeWidth="2.5"
        />
        <path d="M48 40c9 2 17 13 19 25 3 16-5 29-17 32" stroke="#F07A54" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M66 30c-2-10 3-17 12-19 1 9-3 16-11 19" fill="#3C7A4E" stroke="#2A5C39" strokeWidth="2" />
        <path d="M66 30c0-8-2-13-6-17" stroke="#3C7A4E" strokeWidth="4" strokeLinecap="round" />
        <path d="M84 36c8-4 14-3 18 2" stroke="#2A5C39" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
  if (kind === 'tortilla') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <ellipse cx="60" cy="88" rx="40" ry="15" fill="#D8AE6C" />
        <ellipse cx="60" cy="80" rx="40" ry="15" fill="#E7C487" stroke="#B98348" strokeWidth="2" />
        <ellipse cx="60" cy="70" rx="40" ry="15" fill="#EFD39D" stroke="#B98348" strokeWidth="2" />
        <ellipse cx="60" cy="60" rx="40" ry="15" fill="#F5DEAF" stroke="#B98348" strokeWidth="2" />
        <g fill="#C08C52" opacity="0.55">
          <ellipse cx="44" cy="58" rx="5" ry="2.4" />
          <ellipse cx="70" cy="62" rx="7" ry="2.6" />
          <ellipse cx="58" cy="54" rx="4" ry="1.8" />
          <ellipse cx="76" cy="69" rx="5" ry="2" />
          <ellipse cx="39" cy="68" rx="4" ry="1.8" />
        </g>
      </svg>
    )
  }
  if (kind === 'onion') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <path d="M60 24c-8 0-12 8-8 15-16 4-28 20-28 38 0 17 15 27 36 27s36-10 36-27c0-18-12-34-28-38 4-7 0-15-8-15z" fill="#B47A9A" stroke="#7C4463" strokeWidth="2.5" />
        <path d="M60 39c-5 9-10 20-10 35 0 12 4 23 10 30M60 39c5 9 10 20 10 35 0 12-4 23-10 30" stroke="#E0B8CC" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 39c-3 10-5 20-5 32M60 39c3 10 5 20 5 32" stroke="#7C4463" strokeWidth="1.6" fill="none" opacity="0.6" />
        <path d="M60 24c0-8 4-12 10-14M60 24c-2-8-6-11-12-12" stroke="#3C7A4E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="66" r="40" fill="#7FA83F" stroke="#4F7426" strokeWidth="2.5" />
      <circle cx="60" cy="66" r="31" fill="#B5CE6B" opacity="0.75" />
      <g stroke="#E9F2C4" strokeWidth="2" opacity="0.8">
        <path d="M60 35v62M39 47l42 38M39 85l42-38M29 66h62" />
      </g>
      <circle cx="60" cy="66" r="6" fill="#EAF3C9" />
      <path d="M60 26c4-9 12-13 20-12-2 10-9 15-20 14" fill="#3C7A4E" stroke="#2A5C39" strokeWidth="2" />
      <path d="M46 46c-5 5-8 11-9 17" stroke="#FFF7E0" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
    </svg>
  )
}

export function PanArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pan-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A3830" />
          <stop offset="55%" stopColor="#241A16" />
          <stop offset="100%" stopColor="#100B09" />
        </linearGradient>
        <linearGradient id="pan-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C7565" />
          <stop offset="40%" stopColor="#3D2E27" />
          <stop offset="100%" stopColor="#0C0806" />
        </linearGradient>
      </defs>
      <ellipse cx="232" cy="226" rx="150" ry="22" fill="#050403" opacity="0.3" />
      <g transform="rotate(-3 230 140)">
        <rect x="360" y="122" width="106" height="20" rx="9" fill="#5A2B1C" />
        <rect x="366" y="120" width="94" height="8" rx="4" fill="#8A4A2E" />
        <rect x="438" y="118" width="22" height="28" rx="6" fill="#2A1710" />
        <path d="M84 138h300c0 64-58 92-150 92S84 202 84 138z" fill="url(#pan-metal)" stroke="#0B0807" strokeWidth="4" />
        <ellipse cx="234" cy="138" rx="150" ry="31" fill="url(#pan-rim)" stroke="#0B0807" strokeWidth="4" />
        <ellipse cx="234" cy="140" rx="127" ry="21" fill="#1C1411" />
        <ellipse cx="234" cy="141" rx="112" ry="16" fill="#33241D" />
        <g opacity="0.95">
          <ellipse cx="196" cy="140" rx="28" ry="12" fill="#2E765C" />
          <ellipse cx="196" cy="136" rx="23" ry="9" fill="#4E9B6A" />
          <circle cx="236" cy="141" r="13" fill="#C2572F" />
          <circle cx="236" cy="138" r="9" fill="#E8752A" />
          <ellipse cx="278" cy="140" rx="20" ry="10" fill="#F2B63C" />
          <circle cx="270" cy="143" r="4" fill="#F7EBD6" opacity="0.55" />
        </g>
        <path d="M104 154c8 28 44 48 92 54" stroke="#9A8272" strokeWidth="4" fill="none" opacity="0.22" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function FlameArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="fire-glow" cx="50%" cy="90%" r="65%">
          <stop offset="0%" stopColor="#FFE79A" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#F2B63C" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#E8752A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="100" rx="132" ry="28" fill="url(#fire-glow)" />
      <g fill="#E8752A">
        <path d="M96 102c-16-24 0-42 14-58 0 20 16 26 10 46 10-7 12-16 12-25 17 18 15 40-3 52-10 7-24 1-33-15z" opacity="0.9" />
        <path d="M162 106c-12-18 0-32 10-44 0 15 12 20 8 35 7-5 9-12 9-19 12 14 11 30-2 40-8 6-18 1-25-12z" opacity="0.8" />
        <path d="M128 104c-8-12 0-21 6-29 0 10 8 13 5 23 5-3 6-8 6-12 8 9 7 20-1 26-5 4-12 1-16-8z" fill="#F2B63C" />
      </g>
      <g fill="#2A1710" opacity="0.45">
        <rect x="82" y="100" width="136" height="8" rx="4" />
        <rect x="98" y="108" width="104" height="6" rx="3" />
      </g>
    </svg>
  )
}

export function DishArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="plate-g" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#FFF9EA" />
          <stop offset="70%" stopColor="#EFDFC2" />
          <stop offset="100%" stopColor="#D3BC96" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="246" rx="156" ry="26" fill="#2A1710" opacity="0.22" />
      <ellipse cx="210" cy="214" rx="148" ry="54" fill="#C9AF86" />
      <ellipse cx="210" cy="206" rx="148" ry="52" fill="url(#plate-g)" stroke="#BFA77F" strokeWidth="2" />
      <ellipse cx="210" cy="204" rx="112" ry="36" fill="none" stroke="#C2572F" strokeWidth="2" opacity="0.35" />
      <g>
        {[
          { x: 152, rot: -11 },
          { x: 210, rot: 2 },
          { x: 268, rot: 13 },
        ].map((t, i) => (
          <g key={i} transform={`translate(${t.x} 168) rotate(${t.rot})`}>
            <ellipse cx="0" cy="30" rx="38" ry="15" fill="#D8AE6C" />
            <ellipse cx="0" cy="26" rx="38" ry="15" fill="#F5DEAF" stroke="#B98348" strokeWidth="2" />
            <path d="M-30 22c8-14 52-14 60 0-6 20-52 20-60 0z" fill="#2E765C" />
            <path d="M-24 18c14-8 32-8 46 0" stroke="#4E9B6A" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="-10" cy="20" r="5" fill="#C2312E" />
            <circle cx="12" cy="19" r="4" fill="#E8752A" />
            <path d="M-18 14c4-6 12-6 16-1M8 14c4-5 11-5 15 0" stroke="#F7EBD6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <ellipse cx="-2" cy="34" rx="20" ry="6" fill="#B98348" opacity="0.25" />
          </g>
        ))}
      </g>
      <g transform="translate(312 208) rotate(12)">
        <circle cx="0" cy="0" r="16" fill="#7FA83F" stroke="#4F7426" strokeWidth="2" />
        <path d="M0 -16v32M-16 0h32M-11 -11l22 22M-11 11l22-22" stroke="#E9F2C4" strokeWidth="2" />
      </g>
      <g stroke="#3C7A4E" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M92 198c12-10 24-10 34-2M98 208c10-8 20-8 28-2" />
      </g>
      <g fill="#F2B63C">
        <circle cx="104" cy="228" r="3" />
        <circle cx="322" cy="228" r="2.5" />
        <circle cx="340" cy="238" r="2" />
      </g>
    </svg>
  )
}
