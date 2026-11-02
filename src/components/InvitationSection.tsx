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
        <h2 className="font-serif mt-4 text-5xl text-maroon md:text-6xl">
          {event.bride.firstName.toUpperCase()} & {event.groom.firstName.toUpperCase()}
        </h2>
        <p className="font-tamil mt-3 text-xl text-maroon">
          {event.copy.invitationNamesTa}
        </p>
        <p className="font-serif mt-6 text-xl tracking-[0.18em] text-gold">
          {event.type.en}
        </p>
        <p className="font-tamil mt-2 text-base text-maroon/80">
          {event.copy.invitationEventTa}
        </p>
      </motion.article>
    </section>
  );
}
