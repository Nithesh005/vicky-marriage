"use client";

import FloralImage from "@/components/FloralImage";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { event } from "@/data/event";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function GallerySection() {
  const reduced = usePrefersReducedMotion();
  const photos = event.photos.gallery;
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((index) => (index === null ? index : (index + photos.length - 1) % photos.length));
  }, [photos.length]);
  const next = useCallback(() => {
    setActive((index) => (index === null ? index : (index + 1) % photos.length));
  }, [photos.length]);

  const open = (index: number) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActive(index);
  };

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])") ?? [],
      );
    dialog?.querySelector<HTMLElement>("[data-lightbox-close]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus();
    };
  }, [active, close, next, prev]);

  return (
    <Section id="gallery" labelledBy="gallery-heading" className="bg-ink">
      <FloralImage variant="topLeft" className="absolute -left-10 -top-8 w-36 opacity-70 md:w-52" />
      <FloralImage variant="topRight" className="absolute -right-8 -top-6 w-32 opacity-70 md:w-48" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal blur>
          <SectionHeading id="gallery-heading" title={event.copy.galleryHeading} />
          <FloralImage variant="garland" className="mx-auto -mt-6 mb-12 w-56 md:w-80" />
        </Reveal>

        {photos.length === 0 ? (
          <div className="ivory-card ornament-frame mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
            <Image
              src={event.assets.mandala}
              alt=""
              width={140}
              height={140}
              className="mb-6 h-28 w-28 object-contain"
            />
            <p className="font-serif text-2xl text-maroon">{event.copy.galleryEmpty}</p>
            <p className="mt-3 text-sm text-maroon/70">
              Add photographs in <code>src/data/event.ts</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => open(index)}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.7 }}
                className="ornament-frame group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
                aria-label={`Open photograph: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-[center_22%] transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy/70 to-transparent px-5 py-5 text-left text-sm tracking-[0.08em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {photo.alt}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active !== null && photos[active] ? (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/90 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photograph lightbox"
            onClick={close}
            onTouchStart={(event) => {
              touchX.current = event.changedTouches[0]?.clientX ?? 0;
            }}
            onTouchEnd={(event) => {
              const x = event.changedTouches[0]?.clientX ?? 0;
              const delta = x - touchX.current;
              if (delta > 48) prev();
              if (delta < -48) next();
            }}
          >
            <div
              className="flex w-full max-w-4xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={photos[active].src}
                  initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <Image
                    src={photos[active].src}
                    alt={photos[active].alt}
                    width={1200}
                    height={1500}
                    className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>
              </AnimatePresence>
              <p className="mt-4 text-center text-sm tracking-[0.14em] text-champagne" aria-live="polite">
                {photos[active].alt}
              </p>
              <div className="mt-4 flex items-center gap-3">
                {photos.length > 1 ? (
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-champagne transition hover:bg-white/5"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={close}
                  data-lightbox-close
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-champagne transition hover:bg-white/5"
                  aria-label="Close photograph"
                >
                  <X className="h-5 w-5" />
                </button>
                {photos.length > 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-champagne transition hover:bg-white/5"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
