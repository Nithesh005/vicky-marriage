"use client";

import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import FloralImage from "./FloralImage";
import { Kolam } from "./Ornament";

export default function GallerySection() {
  const reduced = usePrefersReducedMotion();
  const photos = event.photos.gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((index) =>
      index === null ? index : (index + photos.length - 1) % photos.length,
    );
  }, [photos.length]);
  const next = useCallback(() => {
    setActive((index) =>
      index === null ? index : (index + 1) % photos.length,
    );
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, next, prev]);

  const touchX = useRef(0);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#3a0e1b] px-4 py-24">
      <FloralImage
        variant="topLeft"
        className="absolute -left-10 -top-8 w-36 opacity-80 md:w-52"
      />
      <FloralImage
        variant="topRight"
        className="absolute -right-8 -top-6 w-32 opacity-80 md:w-48"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Kolam className="mx-auto mb-6 h-8 w-44" />
          <h2 className="font-serif text-4xl text-champagne md:text-5xl">
            {event.copy.galleryHeading}
          </h2>
          <FloralImage variant="garland" className="mx-auto mt-8 w-56 md:w-80" />
        </div>

        {photos.length === 0 ? (
          <div className="ivory-card ornament-frame mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
            <Image
              src={event.assets.mandala}
              alt=""
              width={140}
              height={140}
              className="mb-6 h-28 w-28 object-contain"
            />
            <p className="font-serif text-2xl text-maroon">
              {event.copy.galleryEmpty}
            </p>
            <p className="mt-3 text-sm text-maroon/70">
              Add photographs in <code>src/data/event.ts</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => setActive(index)}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`ornament-frame group relative overflow-hidden rounded-2xl ${
                  index % 5 === 0 ? "md:row-span-2 min-h-72" : "min-h-44"
                }`}
                aria-label={`Open photograph: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active !== null && photos[active] ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy/92 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => {
              touchX.current = e.changedTouches[0]?.clientX ?? 0;
            }}
            onTouchEnd={(e) => {
              const x = e.changedTouches[0]?.clientX ?? 0;
              const delta = x - touchX.current;
              if (delta > 50) prev();
              if (delta < -50) next();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Photograph lightbox"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full border border-gold/50 p-2 text-champagne"
              aria-label="Close photograph"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 rounded-full border border-gold/50 p-2 text-champagne"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              width={1200}
              height={1600}
              className="max-h-[82vh] w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 rounded-full border border-gold/50 p-2 text-champagne"
              aria-label="Next photograph"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
