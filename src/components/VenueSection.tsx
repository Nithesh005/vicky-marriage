"use client";

import { event } from "@/data/event";
import { downloadCalendarInvite } from "@/lib/calendar";
import { mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/maps";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import MandalaWatermarks from "./MandalaWatermarks";
import { Kolam } from "./Ornament";

export default function VenueSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="venue" className="relative overflow-hidden bg-maroon px-4 py-24">
      <MandalaWatermarks />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <Kolam className="mx-auto mb-6 h-8 w-44" />
        <h2 className="font-serif text-4xl text-champagne md:text-5xl">
          {event.copy.venueHeading}
        </h2>
        <p className="font-serif mt-8 text-3xl tracking-[0.12em] text-gold md:text-4xl">
          {event.venue.name.toUpperCase()}
        </p>
        <p className="mt-3 text-sm tracking-[0.24em] text-ivory/80">
          {event.venue.locationLineEn.toUpperCase()}
        </p>
        <p className="font-tamil mt-2 text-base text-blush">
          {event.venue.locationLineTa}
        </p>

        <div className="ornament-frame mt-10 overflow-hidden rounded-3xl bg-burgundy">
          <iframe
            title={`${event.venue.name} map preview`}
            src={mapsEmbedUrl}
            className="h-64 w-full border-0 md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 min-w-[220px] items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.24em] text-burgundy transition hover:bg-champagne"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {event.copy.getDirections}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
