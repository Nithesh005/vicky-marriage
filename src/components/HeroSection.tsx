"use client";

import { event } from "@/data/event";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import GoldParticles from "./GoldParticles";
import { Kolam } from "./Ornament";

export default function HeroSection() {
  return (
    <section className="grain relative flex min-h-dvh items-center justify-center overflow-hidden bg-burgundy px-4 py-20">
      <Image
        src={event.assets.floralFrame}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,11,24,0.55)_0%,rgba(49,11,24,0.28)_40%,rgba(49,11,24,0.72)_100%)]" />
      <GoldParticles />

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-8 md:flex">
        <span className="diya" />
        <span className="diya" />
        <span className="diya" />
      </div>
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-8 md:flex">
        <span className="diya" />
        <span className="diya" />
        <span className="diya" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-champagne">
          {event.copy.heroEyebrow}
        </p>
        <Kolam className="mb-8 h-8 w-48" />
        <h1 className="font-serif gold-foil text-[16vw] leading-[0.85] sm:text-8xl md:text-9xl">
          {event.groom.firstName.toUpperCase()}
        </h1>
        <p className="my-2 font-serif text-4xl text-gold md:text-5xl">&</p>
        <h1 className="font-serif gold-foil text-[16vw] leading-[0.85] sm:text-8xl md:text-9xl">
          {event.bride.firstName.toUpperCase()}
        </h1>
        <p className="mt-8 font-serif text-xl tracking-[0.28em] text-ivory md:text-2xl">
          {event.type.en.toUpperCase()}
        </p>
        <p className="mt-5 text-sm tracking-[0.22em] text-champagne">
          {event.date.heroEn}
        </p>
        <p className="mt-2 text-sm tracking-[0.22em] text-champagne">
          {event.time.heroEn}
        </p>
        <a
          href="#couple"
          className="scroll-hint mt-14 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-champagne/80"
        >
          {event.copy.scrollHint}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
