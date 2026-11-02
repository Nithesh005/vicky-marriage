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
