/** Original illustrated card art — no stock imagery, no sombreros. */

export function FunnyDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="funny-sun" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFE7A3" />
          <stop offset="100%" stopColor="#F2B63C" />
        </radialGradient>
      </defs>
      <g opacity="0.25" stroke="#8E1F2B" strokeWidth="2">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1="200" y1="140" x2="200" y2="22" transform={`rotate(${i * 20} 200 140)`} />
        ))}
      </g>
      <g className="float">
        <circle cx="200" cy="140" r="92" fill="url(#funny-sun)" stroke="#8E1F2B" strokeWidth="3" />
        <path d="M145 116c12-18 30-20 42-4" fill="none" stroke="#2A1710" strokeWidth="6" strokeLinecap="round" />
        <path d="M213 112c12-18 30-20 42-4" fill="none" stroke="#2A1710" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M148 154c14 36 90 36 104 0-34 12-70 12-104 0z"
          fill="#6C1220"
          stroke="#2A1710"
          strokeWidth="3"
        />
        <path d="M174 180c16 10 36 10 52 0" stroke="#F7EBD6" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
        <circle cx="122" cy="166" r="10" fill="#E8752A" opacity="0.55" />
        <circle cx="280" cy="164" r="12" fill="#E8752A" opacity="0.45" />
      </g>
      <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
        <g transform="rotate(-10 90 85)">
          <rect x="58" y="62" width="56" height="42" rx="10" fill="#1F9E96" opacity="0.92" />
          <text x="86" y="92" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="23" fill="#F7EBD6">
            JA
          </text>
        </g>
        <g transform="rotate(9 318 72)">
          <rect x="288" y="48" width="60" height="44" rx="10" fill="#1F3F8F" opacity="0.9" />
          <text x="318" y="80" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="23" fill="#F7EBD6">
            JA
          </text>
        </g>
      </g>
      <g>
        <path d="M58 210l10 22 23 4-17 16 4 23-20-11-20 11 4-23-17-16 23-4z" fill="#C2572F" opacity="0.8" />
        <circle cx="330" cy="208" r="8" fill="#1F9E96" />
        <rect x="70" y="252" width="14" height="8" rx="2" fill="#F2B63C" transform="rotate(22 77 256)" />
        <rect x="300" y="250" width="16" height="8" rx="2" fill="#8E1F2B" transform="rotate(-18 308 254)" />
        <path d="M318 262l6 12M92 270l-4 12" stroke="#1F3F8F" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function CalmDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="calm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE6DA" />
          <stop offset="100%" stopColor="#E8F4EC" />
        </linearGradient>
      </defs>
      <rect x="24" y="22" width="352" height="256" rx="120" fill="url(#calm-sky)" opacity="0.7" />
      <circle cx="298" cy="86" r="30" fill="#F2B63C" opacity="0.85" />
      <g opacity="0.35" fill="#1F9E96">
        <ellipse cx="120" cy="78" rx="34" ry="12" />
        <ellipse cx="148" cy="72" rx="22" ry="9" />
        <ellipse cx="242" cy="118" rx="26" ry="9" />
      </g>
      <g stroke="#1F7A5E" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M50 258V150c0-28 18-46 40-46s40 18 40 46v108" />
        <path d="M270 258V150c0-28 18-46 40-46s40 18 40 46v108" />
        <path d="M90 150v108M310 150v108" opacity="0.3" />
      </g>
      <g fill="#2E765C">
        <path d="M80 142c-30-8-40-32-34-52 24 6 38 28 34 52z" />
        <path d="M100 142c30-8 40-32 34-52-24 6-38 28-34 52z" />
        <path d="M72 170c-26 2-40-14-42-32 22-2 40 12 42 32z" />
        <path d="M300 144c-28-8-38-30-32-48 22 6 36 26 32 48z" />
        <path d="M322 144c28-8 38-30 32-48-22 6-36 26-32 48z" />
      </g>
      <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
        <path d="M92 196c46 34 170 34 216 0" stroke="#8E1F2B" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M92 196c46 34 170 34 216 0" stroke="#F7EBD6" strokeWidth="30" fill="none" strokeLinecap="round" opacity="0.95" />
        <path d="M92 196c46 34 170 34 216 0" stroke="#1F9E96" strokeWidth="3" strokeDasharray="6 9" fill="none" />
        <g transform="translate(154 180)">
          <circle cx="46" cy="12" r="17" fill="#C2572F" />
          <path d="M22 56c0-26 12-38 24-38s24 12 24 38" fill="#1F3F8F" />
          <path d="M10 62h78" stroke="#2A1710" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <path d="M34 8c8-6 16-6 24 0" stroke="#2A1710" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g fill="#1F3F8F" fontFamily="Caveat, cursive" opacity="0.75">
        <text x="262" y="198" fontSize="26" transform="rotate(-8 262 198)">z</text>
        <text x="280" y="180" fontSize="32" transform="rotate(-8 280 180)">z</text>
        <text x="300" y="158" fontSize="38" transform="rotate(-8 300 158)">z</text>
      </g>
      <g opacity="0.5" stroke="#1F9E96" strokeWidth="2" fill="none">
        <path d="M36 214c10-6 20-6 30 0M334 236c10-6 20-6 30 0" />
      </g>
    </svg>
  )
}

export function ChefDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2B26" />
          <stop offset="100%" stopColor="#16100E" />
        </linearGradient>
        <radialGradient id="flame" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#FFE28A" />
          <stop offset="45%" stopColor="#F2B63C" />
          <stop offset="100%" stopColor="#E8752A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="26" y="26" width="348" height="248" rx="24" fill="#F4D9B8" opacity="0.55" />
      <g opacity="0.3" stroke="#C2572F" strokeWidth="1.5">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="26" y1={64 + i * 30} x2="374" y2={64 + i * 30} />
        ))}
      </g>
      <ellipse cx="206" cy="196" rx="118" ry="26" fill="#2A1710" opacity="0.18" />
      <g transform="rotate(-4 200 176)">
        <rect x="282" y="156" width="86" height="15" rx="7" fill="#6C1220" />
        <rect x="286" y="156" width="78" height="5" rx="2" fill="#A8452A" />
        <path d="M88 156h210c0 54-34 80-105 80S88 210 88 156z" fill="url(#pan)" stroke="#0F0B09" strokeWidth="4" />
        <ellipse cx="193" cy="156" rx="105" ry="23" fill="#2A211D" stroke="#0F0B09" strokeWidth="4" />
        <ellipse cx="193" cy="156" rx="88" ry="15" fill="#3B2C24" />
        <g>
          <ellipse cx="154" cy="152" rx="24" ry="12" fill="#2E765C" />
          <ellipse cx="154" cy="148" rx="20" ry="9" fill="#4E9B6A" />
          <circle cx="196" cy="152" r="13" fill="#C2572F" />
          <circle cx="196" cy="149" r="9" fill="#E8752A" />
          <ellipse cx="236" cy="153" rx="18" ry="10" fill="#F2B63C" />
          <path d="M222 148c8-8 20-8 28 0" stroke="#C98D1F" strokeWidth="2" fill="none" />
          <circle cx="174" cy="158" r="5" fill="#F7EBD6" opacity="0.65" />
        </g>
      </g>
      <g className="steam" style={{ transformOrigin: 'center bottom' }}>
        <path d="M150 122c-16-16 14-24 0-42" stroke="#FFF7E0" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M196 116c-16-16 14-24 0-42" stroke="#FFF7E0" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M240 122c-16-16 14-24 0-42" stroke="#FFF7E0" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.65" />
      </g>
      <ellipse cx="200" cy="262" rx="96" ry="22" fill="url(#flame)" opacity="0.85" />
      <g fill="#E8752A">
        <path d="M168 262c-12-18 0-29 10-40 0 14 12 18 8 32 7-5 9-11 9-17 11 13 10 27-3 35-7 4-18-1-24-10z" />
        <path d="M210 266c-10-14 0-22 8-31 0 11 10 14 6 25 6-4 7-9 7-14 9 10 8 21-2 28-6 3-14 0-19-8z" opacity="0.85" />
      </g>
      <g>
        <circle cx="78" cy="96" r="26" fill="#8E1F2B" stroke="#6C1220" strokeWidth="3" />
        <path d="M78 70c4-8 2-12-2-16M86 72c6-4 9-2 12 2" stroke="#4E7A44" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="330" cy="104" rx="32" ry="20" fill="#2E765C" transform="rotate(-18 330 104)" />
        <ellipse cx="330" cy="104" rx="18" ry="11" fill="#8FBF6C" transform="rotate(-18 330 104)" />
        <circle cx="326" cy="108" r="6" fill="#6C1220" />
        <path d="M326 100c-2-8-6-10-10-11" stroke="#4E7A44" strokeWidth="3" fill="none" />
      </g>
      <g fill="#F7EBD6" opacity="0.9">
        <path d="M110 52l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" />
        <path d="M296 236l4 9 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z" opacity="0.65" />
      </g>
    </svg>
  )
}
