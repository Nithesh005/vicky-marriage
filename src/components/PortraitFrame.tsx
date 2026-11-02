"use client";

import Image from "next/image";

type PortraitFrameProps = {
  name: string;
  nameTa: string;
  src: string | null;
  label: string;
};

export default function PortraitFrame({
  name,
  nameTa,
  src,
  label,
}: PortraitFrameProps) {
  return (
    <figure className="flex w-full max-w-[260px] flex-col items-center">
      <div className="ornament-frame relative aspect-[3/4] w-full overflow-hidden rounded-[42%_42%_18%_18%/28%_28%_12%_12%] bg-ivory/10">
        {src ? (
          <Image
            src={src}
            alt={`${name}, ${label}`}
            fill
            sizes="260px"
            className="object-cover transition duration-700 hover:scale-105"
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
        <p className="font-serif text-4xl tracking-wide text-champagne">{name.toUpperCase()}</p>
        <p className="font-tamil mt-1 text-sm text-blush">{nameTa}</p>
      </figcaption>
    </figure>
  );
}
