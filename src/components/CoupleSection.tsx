"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import MandalaWatermarks from "./MandalaWatermarks";
import { Kolam } from "./Ornament";
import PortraitFrame from "./PortraitFrame";

const GoldRing = dynamic(() => import("./GoldRing"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-40 w-40 md:h-52 md:w-52">
      <Image
        src={event.assets.rings}
        alt=""
        width={180}
        height={180}
        className="mx-auto h-full w-full object-contain"
      />
    </div>
  ),
});

export default function CoupleSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="couple" className="relative overflow-hidden bg-maroon px-4 py-24 md:py-32">
      <MandalaWatermarks />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <Kolam className="mx-auto mb-6 h-8 w-48" />
          <h2 className="font-serif text-4xl text-champagne md:text-6xl">
            {event.copy.coupleHeading}
          </h2>
          <p className="font-tamil mt-4 text-lg text-blush">
            {event.copy.coupleHeadingTa}
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-6">
          <PortraitFrame
            name={event.groom.displayName}
            nameTa={event.groom.firstNameTa}
            src={event.photos.groom}
            label="Groom"
            parents={event.groom.parents}
            parentsTa={event.groom.parentsTa}
            hometown={event.groom.hometown}
            hometownTa={event.groom.hometownTa}
          />
          <div className="flex flex-col items-center md:pt-16">
            {reduced ? (
              <Image
                src={event.assets.rings}
                alt="Engagement rings"
                width={160}
                height={160}
                className="h-32 w-32 object-contain"
              />
            ) : (
              <GoldRing />
            )}
          </div>
          <PortraitFrame
            name={event.bride.displayName}
            nameTa={event.bride.firstNameTa}
            src={event.photos.bride}
            label="Bride"
            parents={event.bride.parents}
            parentsTa={event.bride.parentsTa}
            hometown={event.bride.hometown}
            hometownTa={event.bride.hometownTa}
          />
        </div>
      </div>
    </section>
  );
}
