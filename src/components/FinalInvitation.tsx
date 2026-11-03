"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { event } from "@/data/event";
import { mapsDirectionsUrl } from "@/lib/maps";
import { ArrowUp, MapPin } from "lucide-react";
import Image from "next/image";
import GoldParticles from "./GoldParticles";
import { Kolam } from "./Ornament";

export default function FinalInvitation() {
  return (
    <section className="grain relative overflow-hidden bg-burgundy px-5 pt-28 pb-12 md:pt-36 md:pb-14">
      <Image
        src={event.assets.floralFrame}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,11,24,0.4)_0%,rgba(26,7,13,0.88)_100%)]" />
      <GoldParticles />
      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <Image
          src={event.assets.namaste}
          alt="Namaste"
          width={140}
          height={160}
          className="mx-auto mb-8 h-24 w-auto object-contain"
        />
        <p className="font-serif text-3xl leading-snug text-champagne md:text-5xl">
          {event.copy.finaleLine}
        </p>
        <p className="mt-4 font-serif text-xl italic text-ivory/85">{event.copy.finaleSub}</p>
        <p lang="ta" className="font-tamil mt-6 text-lg text-blush">
          {event.copy.finaleLineTa}
        </p>
        <p lang="ta" className="font-tamil mt-2 text-base text-blush/90">
          {event.copy.finaleSubTa}
        </p>
        <Kolam className="mx-auto my-10 h-8 w-48" />
        <p className="eyebrow text-gold">{event.copy.withLove}</p>
        <h2 className="font-serif gold-foil mt-4 text-5xl md:text-7xl">{event.names.joinedUpper}</h2>
        <p className="mt-4 tracking-[0.28em] text-champagne">{event.date.short}</p>
        <div className="mt-10 flex justify-center">
          <Button href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {event.copy.getDirections}
          </Button>
        </div>
        <a
          href="#top"
          className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-champagne/80 transition-colors hover:text-ivory"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          Back to top
        </a>
      </Reveal>
    </section>
  );
}
