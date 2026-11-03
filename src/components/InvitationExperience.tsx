"use client";

import { MotionConfig } from "framer-motion";
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
    <MotionConfig reducedMotion="user">
      <a href="#content" className="skip-link">
        Skip to invitation
      </a>
      <FloatingDecorations />
      <MusicPlayer shouldPlay />
      <main id="content">
        <HeroSection />
        <CoupleSection />
        <InvitationSection />
        <Countdown />
        <EventDetails />
        <VenueSection />
        <GallerySection />
        <FinalInvitation />
      </main>
    </MotionConfig>
  );
}
