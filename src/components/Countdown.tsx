"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { event } from "@/data/event";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MandalaWatermarks from "./MandalaWatermarks";

function Unit({ value, label }: { value: number | null; label: string }) {
  const reduced = usePrefersReducedMotion();
  const display = value === null ? "--" : String(value).padStart(2, "0");

  return (
    <div className="glass-panel flex min-w-[4.75rem] flex-col items-center rounded-2xl px-3 py-4 md:min-w-[6.5rem] md:px-5 md:py-6">
      <span className="relative block h-[1.15em] overflow-hidden font-serif text-4xl text-gold tabular-nums md:text-6xl">
        {reduced ? (
          <span className="block">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ y: "80%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-80%", opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
      <span className="mt-3 text-[10px] uppercase tracking-[0.28em] text-champagne">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTime(getTimeLeft());
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const started = time !== null && time.total <= 0;
  const spoken =
    time === null
      ? "Calculating the time remaining."
      : started
        ? event.copy.celebrationEn
        : `${time.days} days, ${time.hours} hours, and ${time.minutes} minutes remaining.`;

  return (
    <Section id="countdown" labelledBy="countdown-heading" className="bg-ink">
      <MandalaWatermarks />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <SectionHeading id="countdown-heading" title={event.copy.countdownHeading} />
        <p className="sr-only" aria-live="polite">
          {spoken}
        </p>
        {started ? (
          <div className="mt-2">
            <p className="font-serif text-3xl text-gold md:text-4xl">{event.copy.celebrationEn}</p>
            <p lang="ta" className="font-tamil mt-3 text-lg text-blush">
              {event.copy.celebrationTa}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <Unit value={time?.days ?? null} label="Days" />
            <Unit value={time?.hours ?? null} label="Hours" />
            <Unit value={time?.minutes ?? null} label="Minutes" />
            <Unit value={time?.seconds ?? null} label="Seconds" />
          </div>
        )}
      </Reveal>
    </Section>
  );
}
