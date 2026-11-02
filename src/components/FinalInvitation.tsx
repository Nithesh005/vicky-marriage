"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import GoldParticles from "./GoldParticles";
import { Kolam } from "./Ornament";

export default function FinalInvitation() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="grain relative overflow-hidden bg-burgundy px-4 py-28">
      <Image
        src={event.assets.floralFrame}
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,11,24,0.35)_0%,rgba(49,11,24,0.82)_100%)]" />
      <GoldParticles />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <Image
          src={event.assets.namaste}
          alt=""
          width={120}
          height={140}
          className="mx-auto mb-8 h-24 w-auto object-contain"
        />
        <p className="font-serif text-3xl leading-snug text-champagne md:text-4xl">
          {event.copy.finaleLine}
        </p>
        <p className="mt-4 font-serif text-xl italic text-ivory/85">
          {event.copy.finaleSub}
        </p>
        <p className="font-tamil mt-6 text-lg text-blush">{event.copy.finaleLineTa}</p>
        <p className="font-tamil mt-2 text-base text-blush/90">
          {event.copy.finaleSubTa}
        </p>
        <Kolam className="mx-auto my-10 h-8 w-48" />
        <p className="text-[11px] uppercase tracking-[0.42em] text-gold">
          {event.copy.withLove}
        </p>
        <h2 className="font-serif gold-foil mt-4 text-5xl md:text-6xl">
          {event.bride.firstName.toUpperCase()} & {event.groom.firstName.toUpperCase()}
        </h2>
        <p className="mt-4 tracking-[0.28em] text-champagne">{event.date.short}</p>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#1a070d]" />
    </section>
  );
}
