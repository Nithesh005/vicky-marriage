"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { event } from "@/data/event";
import dynamic from "next/dynamic";
import MandalaWatermarks from "./MandalaWatermarks";
import PortraitFrame from "./PortraitFrame";
import { TwinRingsMark } from "./Ornament";

const GoldRing = dynamic(() => import("./GoldRing"), {
  ssr: false,
  loading: () => <TwinRingsMark className="mx-auto h-40 w-40 md:h-52 md:w-52" />,
});

export default function CoupleSection() {
  return (
    <Section id="couple" labelledBy="couple-heading" className="bg-maroon">
      <MandalaWatermarks />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal blur>
          <SectionHeading
            id="couple-heading"
            title={event.copy.coupleHeading}
            titleTa={event.copy.coupleHeadingTa}
          />
        </Reveal>

        <Stagger className="flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:gap-8 lg:gap-14">
          <StaggerItem>
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
          </StaggerItem>
          <StaggerItem className="hidden md:block md:pt-24">
            <GoldRing />
          </StaggerItem>
          <StaggerItem>
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
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}
