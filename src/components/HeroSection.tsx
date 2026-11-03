"use client";

import { Chip } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ChevronDown, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import FloralImage from "./FloralImage";
import GoldParticles from "./GoldParticles";
import { Kolam } from "./Ornament";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.95, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 640], [0, reduced ? 0 : 56]);
  const floralY = useTransform(scrollY, [0, 640], [0, reduced ? 0 : -42]);

  return (
    <section
      id="top"
      className="grain relative flex min-h-dvh items-center justify-center overflow-hidden bg-burgundy px-5 py-16"
    >
      <Image
        src={event.assets.floralFrame}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,11,24,0.62)_0%,rgba(49,11,24,0.28)_42%,rgba(49,11,24,0.78)_100%)]" />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute left-1/2 top-[46%] h-[58vh] w-[86vw] max-w-3xl rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.2),transparent_68%)]"
      />
      <GoldParticles />

      <motion.div style={{ y: floralY }} className="pointer-events-none absolute -left-10 -top-6 z-[2] w-32 sm:w-48 md:w-72 lg:w-[22rem]">
        <FloralImage variant="topLeft" className="w-full" />
      </motion.div>
      <motion.div style={{ y: floralY }} className="pointer-events-none absolute -right-8 -top-4 z-[2] w-28 sm:w-44 md:w-72 lg:w-[22rem]">
        <FloralImage variant="topRight" className="w-full" />
      </motion.div>

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-8 md:flex" aria-hidden="true">
        <span className="diya" />
        <span className="diya" />
        <span className="diya" />
      </div>
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-8 md:flex" aria-hidden="true">
        <span className="diya" />
        <span className="diya" />
        <span className="diya" />
      </div>

      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
          }}
          className="flex flex-col items-center"
        >
          <HeroLine>
            <p className="eyebrow text-champagne">{event.copy.heroEyebrow}</p>
          </HeroLine>
          <HeroLine className="mt-6">
            <Kolam className="h-8 w-48" />
          </HeroLine>
          <HeroLine className="mt-8">
            <h1 className="font-serif text-display">
              <span className="gold-foil block">{event.groom.firstName.toUpperCase()}</span>
              <span className="my-1 block font-serif text-4xl italic text-gold md:my-2 md:text-6xl">&</span>
              <span className="gold-foil block">{event.bride.firstName.toUpperCase()}</span>
            </h1>
          </HeroLine>
          <HeroLine className="mt-8">
            <p className="font-serif text-lg tracking-[0.32em] text-ivory md:text-2xl">
              {event.type.en.toUpperCase()}
            </p>
          </HeroLine>
          <HeroLine className="mt-6">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              <Chip>
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {event.date.heroEn}
              </Chip>
              <Chip>
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {event.time.heroEn}
              </Chip>
              <Chip>
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {event.venue.city}
              </Chip>
            </div>
          </HeroLine>
          <HeroLine className="mt-10">
            <Button href="#invitation">View Invitation</Button>
          </HeroLine>
          <HeroLine className="mt-12">
            <a
              href="#couple"
              className="scroll-hint inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-champagne/80 transition-colors hover:text-ivory"
            >
              {event.copy.scrollHint}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </HeroLine>
        </motion.div>
      </motion.div>
    </section>
  );
}
