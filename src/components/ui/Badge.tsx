import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "emerald";
}) {
  const tones = {
    gold: "border-gold/45 text-champagne",
    emerald: "border-emerald/30 text-emerald",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-champagne/25 bg-burgundy/45 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-champagne backdrop-blur-sm">
      {children}
    </span>
  );
}
