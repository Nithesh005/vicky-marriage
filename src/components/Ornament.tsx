export function Kolam({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 20 H70 M130 20 H190"
        stroke="#C9A45C"
        strokeOpacity="0.7"
        strokeWidth="0.8"
      />
      <path
        d="M86 20c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14Z"
        stroke="#C9A45C"
        strokeWidth="0.9"
      />
      <path
        d="M92 20c0-5 4-8 8-8s8 3 8 8-4 8-8 8-8-3-8-8Z"
        stroke="#E7D4A5"
        strokeWidth="0.8"
      />
      <circle cx="100" cy="20" r="2.2" fill="#C9A45C" />
      <path
        d="M74 20l8-8 4 8-4 8-8-8Zm44 0-8-8-4 8 4 8 8-8Z"
        stroke="#C9A45C"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function TwinRingsMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="ring-metal" x1="20" y1="10" x2="140" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4E4B8" />
          <stop offset="0.48" stopColor="#C9A45C" />
          <stop offset="1" stopColor="#8D6B2F" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="62" rx="38" ry="26" stroke="url(#ring-metal)" strokeWidth="7" />
      <path
        d="M92 40c18 4 32 16 32 28 0 16-16 30-38 34"
        stroke="url(#ring-metal)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M86 88c-20 2-40-8-46-22"
        stroke="url(#ring-metal)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <ellipse cx="98" cy="58" rx="36" ry="24" stroke="url(#ring-metal)" strokeWidth="7" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 72 C8 32 32 8 72 8"
        stroke="#C9A45C"
        strokeWidth="1.2"
      />
      <path
        d="M18 72 C18 40 40 18 72 18"
        stroke="#E7D4A5"
        strokeWidth="0.7"
        opacity="0.8"
      />
      <circle cx="16" cy="16" r="2" fill="#C9A45C" />
    </svg>
  );
}
