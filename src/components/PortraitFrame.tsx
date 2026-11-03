"use client";

import Image from "next/image";

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
  return (
    <figure className="flex w-full max-w-[280px] flex-col items-center">
      <div className="ornament-frame relative aspect-[3/4] w-full overflow-hidden rounded-[42%_42%_18%_18%/28%_28%_12%_12%] bg-ivory/10">
        {src ? (
          <Image
            src={src}
            alt={`${name}, ${label}`}
            fill
            sizes="280px"
            className="object-cover object-top transition duration-700 hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(201,164,92,0.18),transparent_60%)] px-6 text-center">
            <span className="font-serif text-5xl text-gold">{name[0]}</span>
            <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-champagne/80">
              Portrait arriving
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{label}</p>
        <p className="font-serif mt-2 text-4xl tracking-wide text-champagne">
          {name.toUpperCase()}
        </p>
        <p className="font-tamil mt-1 text-sm text-blush">{nameTa}</p>
        {parents ? (
          <p className="mt-3 text-sm leading-relaxed text-ivory/80">{parents}</p>
        ) : null}
        {parentsTa ? (
          <p className="font-tamil mt-1 text-xs text-blush/80">{parentsTa}</p>
        ) : null}
        {hometown ? (
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-champagne/80">
            {hometown}
          </p>
        ) : null}
        {hometownTa ? (
          <p className="font-tamil mt-1 text-xs text-blush/70">{hometownTa}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
