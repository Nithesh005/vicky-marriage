"use client";

import { PaperCard } from "@/components/ui/PaperCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { event } from "@/data/event";
import { Calendar, Clock, Heart, Landmark, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import { Kolam } from "./Ornament";

const rows: {
  label: string;
  labelTa: string;
  value: string;
  valueTa: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Event",
    labelTa: "நிகழ்வு",
    value: event.type.en,
    valueTa: event.type.ta,
    icon: Sparkles,
  },
  {
    label: "Groom",
    labelTa: "மணமகன்",
    value: event.groom.displayName,
    valueTa: event.groom.firstNameTa,
    icon: Heart,
  },
  {
    label: "Bride",
    labelTa: "மணமகள்",
    value: event.bride.displayName,
    valueTa: event.bride.firstNameTa,
    icon: Heart,
  },
  {
    label: "Date",
    labelTa: "தேதி",
    value: event.date.displayEn,
    valueTa: event.date.displayTa,
    icon: Calendar,
  },
  {
    label: "Time",
    labelTa: "நேரம்",
    value: event.time.displayEn,
    valueTa: event.time.displayTa,
    icon: Clock,
  },
  {
    label: "Venue",
    labelTa: "இடம்",
    value: event.venue.name,
    valueTa: event.venue.locationLineTa,
    icon: Landmark,
  },
  {
    label: "Location",
    labelTa: "",
    value: event.venue.locationLineEn,
    valueTa: "",
    icon: MapPin,
  },
];

export default function EventDetails() {
  return (
    <Section id="details" labelledBy="details-heading" className="bg-veil">
      <Reveal y={32}>
        <PaperCard className="max-w-xl px-6 py-14 md:px-14">
          <h2 id="details-heading" className="font-serif text-center text-title text-maroon">
            {event.copy.detailsHeading}
          </h2>
          <Kolam className="mx-auto my-6 h-8 w-40" />
          <dl className="divide-y divide-gold/25">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[9.5rem_1fr] sm:items-baseline sm:gap-4"
                >
                  <dt className="flex items-start gap-2 text-[11px] uppercase tracking-[0.22em] text-emerald">
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      {row.label}
                      {row.labelTa ? (
                        <span lang="ta" className="font-tamil mt-1 block text-[12px] tracking-normal text-maroon/60">
                          {row.labelTa}
                        </span>
                      ) : null}
                    </span>
                  </dt>
                  <dd>
                    <p className="font-serif text-xl leading-snug text-maroon">{row.value}</p>
                    {row.valueTa ? (
                      <p lang="ta" className="font-tamil mt-1 text-sm text-maroon/75">
                        {row.valueTa}
                      </p>
                    ) : null}
                  </dd>
                </div>
              );
            })}
          </dl>
        </PaperCard>
      </Reveal>
    </Section>
  );
}
