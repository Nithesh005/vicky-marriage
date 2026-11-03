"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import { CornerFlourish, Kolam } from "./Ornament";

const rows = [
  {
    label: "Event",
    labelTa: "நிகழ்வு",
    value: event.type.en,
    valueTa: event.type.ta,
  },
  {
    label: "Groom",
    labelTa: "மணமகன்",
    value: event.groom.displayName,
    valueTa: event.groom.firstNameTa,
  },
  {
    label: "Bride",
    labelTa: "மணமகள்",
    value: event.bride.displayName,
    valueTa: event.bride.firstNameTa,
  },
  {
    label: "Date",
    labelTa: "தேதி",
    value: event.date.displayEn,
    valueTa: event.date.displayTa,
  },
  {
    label: "Time",
    labelTa: "நேரம்",
    value: event.time.displayEn,
    valueTa: event.time.displayTa,
  },
  {
    label: "Venue",
    labelTa: "இடம்",
    value: event.venue.name,
    valueTa: event.venue.locationLineTa,
  },
  {
    label: "Location",
    labelTa: "",
    value: event.venue.locationLineEn,
    valueTa: "",
  },
] as const;

export default function EventDetails() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="details" className="bg-[#2b0914] px-4 py-24">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="ivory-card ornament-frame relative mx-auto max-w-xl px-6 py-12 md:px-12"
      >
        <CornerFlourish className="absolute left-3 top-3 h-14 w-14" />
        <CornerFlourish className="absolute right-3 top-3 h-14 w-14 rotate-90" />
        <h2 className="font-serif text-center text-4xl text-maroon">
          {event.copy.detailsHeading}
        </h2>
        <Kolam className="mx-auto my-5 h-8 w-40" />
        <dl className="divide-y divide-gold/25">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[140px_1fr] sm:items-baseline">
              <dt className="text-[11px] uppercase tracking-[0.24em] text-emerald">
                {row.label}
                {row.labelTa ? (
                  <span className="font-tamil mt-1 block text-[12px] tracking-normal text-maroon/60">
                    {row.labelTa}
                  </span>
                ) : null}
              </dt>
              <dd>
                <p className="font-serif text-xl text-maroon">{row.value}</p>
                {row.valueTa ? (
                  <p className="font-tamil mt-1 text-sm text-maroon/75">{row.valueTa}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
