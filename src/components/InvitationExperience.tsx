"use client";

import Countdown from "./Countdown";
import CoupleSection from "./CoupleSection";
import EventDetails from "./EventDetails";
import FinalInvitation from "./FinalInvitation";
import FloatingDecorations from "./FloatingDecorations";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import InvitationSection from "./InvitationSection";
import MusicPlayer from "./MusicPlayer";
import VenueSection from "./VenueSection";

export default function InvitationExperience() {
  return (
    <>
      <FloatingDecorations />
      <MusicPlayer shouldPlay />

      <main>
        <HeroSection />
        <CoupleSection />
        <InvitationSection />
        <Countdown />
        <EventDetails />
        <VenueSection />
        <GallerySection />
        <FinalInvitation />
      </main>
    </>
  );
}
