"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function FloatingDecorations() {
  const reduced = usePrefersReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${8 + i * 15}%`,
        delay: `${i * 1.4}s`,
        duration: `${16 + (i % 5) * 3}s`,
        scale: 0.7 + (i % 4) * 0.18,
      })),
    [],
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `scale(${petal.scale})`,
          }}
        />
      ))}
    </div>
  );
}
