"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PaperCard } from "@/components/ui/PaperCard";
import { event } from "@/data/event";
import Image from "next/image";
import { Kolam } from "./Ornament";

export default function InvitationSection() {
  return (
    <Section id="invitation" labelledBy="invitation-heading" className="bg-veil">
      <Reveal y={36}>
        <PaperCard className="max-w-2xl px-6 py-16 text-center md:px-16 md:py-20">
          <Image
            src={event.assets.ganesh}
            alt="Lord Ganesha"
            width={88}
            height={88}
            className="mx-auto mb-5 h-16 w-16 object-contain"
          />
          <p className="eyebrow text-emerald">{event.copy.invitationEyebrow}</p>
          <Kolam className="mx-auto my-6 h-8 w-44" />
          <p className="font-serif text-2xl leading-snug text-maroon md:text-3xl">
            {event.copy.invitationBlessing}
          </p>
          <p lang="ta" className="font-tamil mt-3 text-base text-maroon/80">
            {event.copy.invitationBlessingTa}
          </p>
          <p className="mt-8 text-sm tracking-[0.16em] text-maroon/70">
            {event.copy.invitationBody}
          </p>
          <h2 id="invitation-heading" className="font-serif mt-4 text-4xl text-maroon md:text-5xl">
            {event.names.joinedUpper}
          </h2>
          <p lang="ta" className="font-tamil mt-3 text-xl text-maroon">
            {event.copy.invitationNamesTa}
          </p>

          <div className="mt-10 grid gap-8 border-y border-gold/25 py-8 text-left sm:grid-cols-2 sm:text-center">
            <div>
              <p className="eyebrow text-emerald">Groom</p>
              <p className="font-serif mt-3 text-2xl text-maroon">{event.groom.displayName}</p>
              <p className="mt-2 text-sm leading-relaxed text-maroon/75">{event.groom.parents}</p>
              <p lang="ta" className="font-tamil mt-1 text-xs text-maroon/65">
                {event.groom.parentsTa}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-maroon/70">
                {event.groom.hometown}
              </p>
            </div>
            <div>
              <p className="eyebrow text-emerald">Bride</p>
              <p className="font-serif mt-3 text-2xl text-maroon">{event.bride.displayName}</p>
              <p className="mt-2 text-sm leading-relaxed text-maroon/75">{event.bride.parents}</p>
              <p lang="ta" className="font-tamil mt-1 text-xs text-maroon/65">
                {event.bride.parentsTa}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-maroon/70">
                {event.bride.hometown}
              </p>
            </div>
          </div>

          <p className="font-serif mt-8 text-xl tracking-[0.18em] text-gold">{event.type.en}</p>
          <p lang="ta" className="font-tamil mt-2 text-base text-maroon/80">
            {event.copy.invitationEventTa}
          </p>
          <p className="mt-5 text-sm tracking-[0.12em] text-maroon/80">
            {event.date.displayEn}
            <span aria-hidden="true"> · </span>
            {event.time.displayEn}
          </p>
          <p className="mt-2 text-sm text-maroon/70">
            {event.venue.name}, {event.venue.city}
          </p>
        </PaperCard>
      </Reveal>
    </Section>
  );
}
