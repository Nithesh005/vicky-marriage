"use client";

import { event } from "@/data/event";
import { getTimeLeft } from "@/lib/countdown";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Kolam } from "./Ornament";

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="ornament-frame flex min-w-[72px] flex-col items-center rounded-2xl bg-burgundy/80 px-3 py-4 md:min-w-[96px] md:px-5">
      <span className="font-serif text-4xl text-gold tabular-nums md:text-5xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-champagne">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const reduced = usePrefersReducedMotion();
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const started = time !== null && time.total <= 0;

  return (
    <section className="bg-maroon px-4 py-24">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-3xl text-center"
      >
        <Kolam className="mx-auto mb-6 h-8 w-44" />
        <h2 className="font-serif text-4xl text-champagne md:text-5xl">
          {event.copy.countdownHeading}
        </h2>
        {started ? (
          <div className="mt-10">
            <p className="font-serif text-3xl text-gold md:text-4xl">
              {event.copy.celebrationEn}
            </p>
            <p className="font-tamil mt-3 text-lg text-blush">
              {event.copy.celebrationTa}
            </p>
          </div>
        ) : (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <Unit value={time?.days ?? null} label="Days" />
            <Unit value={time?.hours ?? null} label="Hours" />
            <Unit value={time?.minutes ?? null} label="Minutes" />
            <Unit value={time?.seconds ?? null} label="Seconds" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
