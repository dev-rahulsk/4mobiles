interface PhoneIllustrationProps {
  accent?: string
}

export function PhoneIllustration({ accent = '#7AB827' }: PhoneIllustrationProps) {
  return (
    <svg viewBox="0 0 520 560" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0e1410" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="screen2Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Glow */}
      <circle cx="260" cy="260" r="240" fill="url(#glow)" />

      {/* Back phone (cracked) */}
      <g transform="translate(70 90) rotate(-10 130 220)">
        <rect x="0" y="0" width="220" height="430" rx="34" fill="#0a0a0a" filter="url(#softShadow)" opacity="0.4" transform="translate(8 14)" />
        <rect x="0" y="0" width="220" height="430" rx="34" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <rect x="10" y="10" width="200" height="410" rx="26" fill="url(#screen2Grad)" />
        <rect x="85" y="18" width="50" height="8" rx="4" fill="#000" />
        <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M60 120 L120 180 L90 230 L150 270 L100 330" />
          <path d="M120 180 L170 200" />
          <path d="M120 180 L80 200" />
          <path d="M150 270 L190 290" />
          <path d="M150 270 L130 310" />
          <path d="M90 230 L40 250" />
          <path d="M100 330 L70 380" />
          <path d="M100 330 L140 360" />
        </g>
        <g stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5" fill="none">
          <path d="M30 100 L200 200 L60 350" />
          <path d="M180 80 L100 250 L200 380" />
        </g>
      </g>

      {/* Front phone (fixed, glowing) */}
      <g transform="translate(220 70) rotate(8 130 230)">
        <rect x="0" y="0" width="240" height="470" rx="36" fill="#0a0a0a" filter="url(#softShadow)" opacity="0.5" transform="translate(10 18)" />
        <rect x="0" y="0" width="240" height="470" rx="36" fill="#0e0e0e" stroke="#262626" strokeWidth="1" />
        <rect x="10" y="10" width="220" height="450" rx="28" fill="url(#screenGrad)" />
        <rect x="95" y="20" width="50" height="10" rx="5" fill="#000" />
        <text x="30" y="55" fill="#ffffff" fontSize="13" fontFamily="ui-sans-serif, system-ui" fontWeight="600">9:41</text>
        <g transform="translate(190 45)" fill="#ffffff">
          <rect x="0" y="3" width="3" height="6" rx="0.5" />
          <rect x="5" y="1" width="3" height="8" rx="0.5" />
          <rect x="10" y="-1" width="3" height="10" rx="0.5" opacity="0.9" />
          <rect x="18" y="0" width="14" height="8" rx="2" stroke="#fff" strokeWidth="0.8" fill="none" />
          <rect x="20" y="2" width="9" height="4" fill="#fff" />
        </g>
        <g transform="translate(120 235)">
          <circle cx="0" cy="0" r="56" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
          <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="800" fontFamily="ui-sans-serif, system-ui">4M</text>
        </g>
        <text x="120" y="320" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="ui-sans-serif, system-ui" letterSpacing="2">REPAIRED</text>
        <g transform="translate(120 345)" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M-30 0 L-10 0 M10 0 L30 0" />
        </g>
        <g transform="translate(35 380)">
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={i * 50} y="0" width="40" height="40" rx="9" fill="#ffffff" fillOpacity={0.18 - i * 0.02} />
          ))}
        </g>
      </g>
    </svg>
  )
}
