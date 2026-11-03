"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import { CornerFlourish, Kolam } from "./Ornament";

export default function InvitationSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-[#3a0e1b] px-4 py-24">
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 40, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="ivory-card ornament-frame relative mx-auto max-w-2xl px-6 py-14 text-center md:px-14 md:py-16"
      >
        <CornerFlourish className="absolute left-3 top-3 h-16 w-16" />
        <CornerFlourish className="absolute right-3 top-3 h-16 w-16 rotate-90" />
        <CornerFlourish className="absolute bottom-3 left-3 h-16 w-16 -rotate-90" />
        <CornerFlourish className="absolute bottom-3 right-3 h-16 w-16 rotate-180" />

        <Image
          src={event.assets.ganesh}
          alt="Lord Ganesha"
          width={72}
          height={72}
          className="mx-auto mb-4 h-16 w-16 object-contain"
        />
        <p className="text-[11px] uppercase tracking-[0.38em] text-emerald">
          {event.copy.invitationEyebrow}
        </p>
        <Kolam className="mx-auto my-5 h-8 w-44" />
        <p className="font-serif text-2xl text-maroon md:text-3xl">
          {event.copy.invitationBlessing}
        </p>
        <p className="font-tamil mt-2 text-base text-maroon/80">
          {event.copy.invitationBlessingTa}
        </p>
        <p className="mt-6 text-sm tracking-[0.16em] text-maroon/70">
          {event.copy.invitationBody}
        </p>
        <h2 className="font-serif mt-4 text-4xl text-maroon md:text-5xl">
          {event.names.joinedUpper}
        </h2>
        <p className="font-tamil mt-3 text-xl text-maroon">
          {event.copy.invitationNamesTa}
        </p>

        <div className="mt-10 grid gap-8 text-left sm:grid-cols-2 sm:text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-emerald">
              Groom
            </p>
            <p className="font-serif mt-2 text-2xl text-maroon">
              {event.groom.displayName}
            </p>
            <p className="mt-2 text-sm text-maroon/75">{event.groom.parents}</p>
            <p className="font-tamil mt-1 text-xs text-maroon/65">
              {event.groom.parentsTa}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-maroon/70">
              {event.groom.hometown}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-emerald">
              Bride
            </p>
            <p className="font-serif mt-2 text-2xl text-maroon">
              {event.bride.displayName}
            </p>
            <p className="mt-2 text-sm text-maroon/75">{event.bride.parents}</p>
            <p className="font-tamil mt-1 text-xs text-maroon/65">
              {event.bride.parentsTa}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-maroon/70">
              {event.bride.hometown}
            </p>
          </div>
        </div>

        <p className="font-serif mt-10 text-xl tracking-[0.18em] text-gold">
          {event.type.en}
        </p>
        <p className="font-tamil mt-2 text-base text-maroon/80">
          {event.copy.invitationEventTa}
        </p>
        <p className="mt-4 text-sm tracking-[0.12em] text-maroon/75">
          {event.date.displayEn} · {event.time.displayEn}
        </p>
        <p className="mt-2 text-sm text-maroon/70">
          {event.venue.name}, {event.venue.city}
        </p>
      </motion.article>
    </section>
  );
}
