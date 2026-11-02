"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import CoupleSection from "./CoupleSection";
import EventDetails from "./EventDetails";
import FinalInvitation from "./FinalInvitation";
import FloatingDecorations from "./FloatingDecorations";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import IntroScreen from "./IntroScreen";
import InvitationSection from "./InvitationSection";
import MusicPlayer from "./MusicPlayer";
import VenueSection from "./VenueSection";

export default function InvitationExperience() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <IntroScreen onOpen={() => setOpened(true)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {opened ? <FloatingDecorations /> : null}
      {opened ? <MusicPlayer shouldPlay={opened} /> : null}

      <main className={opened ? "block" : "hidden"}>
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
