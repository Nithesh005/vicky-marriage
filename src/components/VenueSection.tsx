"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { event } from "@/data/event";
import { mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/maps";
import { MapPin } from "lucide-react";
import MandalaWatermarks from "./MandalaWatermarks";

export default function VenueSection() {
  return (
    <Section id="venue" labelledBy="venue-heading" className="bg-maroon">
      <MandalaWatermarks />
      <Reveal className="relative z-10 mx-auto max-w-4xl text-center">
        <SectionHeading id="venue-heading" title={event.copy.venueHeading} />
        <p className="font-serif text-3xl tracking-[0.08em] text-gold md:text-4xl">
          {event.venue.name.toUpperCase()}
        </p>
        <p className="mt-4 text-sm tracking-[0.22em] text-ivory/85">
          {event.venue.locationLineEn.toUpperCase()}
        </p>
        <p lang="ta" className="font-tamil mt-3 text-base text-blush">
          {event.venue.locationLineTa}
        </p>

        <div className="ornament-frame mt-10 overflow-hidden rounded-3xl bg-burgundy shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
          <iframe
            title={`${event.venue.name} map preview`}
            src={mapsEmbedUrl}
            className="h-72 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {event.copy.getDirections}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
