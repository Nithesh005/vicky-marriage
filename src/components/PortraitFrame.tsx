"use client";

import { Badge } from "@/components/ui/Badge";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";

type PortraitFrameProps = {
  name: string;
  nameTa: string;
  src: string | null;
  label: string;
  parents?: string;
  parentsTa?: string;
  hometown?: string;
  hometownTa?: string;
};

export default function PortraitFrame({
  name,
  nameTa,
  src,
  label,
  parents,
  parentsTa,
  hometown,
  hometownTa,
}: PortraitFrameProps) {
  const reduced = usePrefersReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!fine.current || reduced || !mediaRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    mediaRef.current.style.transition = "transform 90ms linear";
    mediaRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
  };

  const onLeave = () => {
    if (!mediaRef.current) return;
    mediaRef.current.style.transition = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";
    mediaRef.current.style.transform = "";
  };

  return (
    <figure className="flex w-full max-w-[320px] flex-col items-center">
      <div
        className="ornament-frame group relative aspect-[3/4] w-full overflow-hidden rounded-[42%_42%_16%_16%/26%_26%_12%_12%] bg-ivory/10 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {src ? (
          <div ref={mediaRef} className="absolute inset-0">
            <Image
              src={src}
              alt={`${name}, ${label}`}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover object-[center_18%]"
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(201,164,92,0.18),transparent_60%)] px-6 text-center">
            <span className="font-serif text-5xl text-gold">{name[0]}</span>
            <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-champagne/80">
              Portrait arriving
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(49,11,24,0.38)_100%)]" />
      </div>
      <figcaption className="mt-6 text-center">
        <Badge>{label}</Badge>
        <p className="font-serif mt-4 text-4xl tracking-[0.04em] text-champagne">
          {name.toUpperCase()}
        </p>
        <p lang="ta" className="font-tamil mt-1 text-sm text-blush">
          {nameTa}
        </p>
        {parents ? (
          <p className="mt-4 text-sm leading-relaxed text-ivory/85">{parents}</p>
        ) : null}
        {parentsTa ? (
          <p lang="ta" className="font-tamil mt-1 text-xs text-blush/85">
            {parentsTa}
          </p>
        ) : null}
        {hometown ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-champagne/85">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {hometown}
          </p>
        ) : null}
        {hometownTa ? (
          <p lang="ta" className="font-tamil mt-1 text-xs text-blush/75">
            {hometownTa}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
