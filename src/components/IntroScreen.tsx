"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import GoldParticles from "./GoldParticles";

type IntroScreenProps = {
  onOpen: () => void;
};

export default function IntroScreen({ onOpen }: IntroScreenProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        emblemRef.current,
        { opacity: 0, scale: 0.72, rotate: -12 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.8 },
      )
        .fromTo(
          namesRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.6",
        )
        .fromTo(
          lineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2",
        );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="grain fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-burgundy px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(74,16,32,0.4),transparent_55%)]" />
      <GoldParticles />
      <div className="relative flex max-w-lg flex-col items-center text-center">
        <div ref={emblemRef} className="relative mb-8 h-36 w-36 md:h-44 md:w-44">
          <Image
            src={event.assets.mandala}
            alt=""
            fill
            className="object-contain opacity-90"
            priority
          />
          <Image
            src={event.assets.ganesh}
            alt="Lord Ganesha"
            width={92}
            height={92}
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply md:h-20 md:w-20"
            priority
          />
        </div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.48em] text-champagne/80">
          Engagement Invitation
        </p>
        <h1
          ref={namesRef}
          className="font-serif gold-foil text-5xl leading-none tracking-wide md:text-6xl"
        >
          {event.bride.firstName.toUpperCase()} & {event.groom.firstName.toUpperCase()}
        </h1>
        <p
          ref={lineRef}
          className="mt-5 font-serif text-lg italic text-blush md:text-xl"
        >
          {event.copy.introLine}
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={onOpen}
          className="gold-btn mt-12 min-h-12 rounded-full border border-gold px-10 py-3 font-serif text-sm uppercase tracking-[0.32em] text-champagne transition duration-500 hover:bg-gold/15 hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:scale-95"
        >
          {event.copy.openInvitation}
        </button>
      </div>
    </div>
  );
}
