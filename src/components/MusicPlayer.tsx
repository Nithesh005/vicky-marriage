"use client";

import { event } from "@/data/event";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "invitation-music";

type MusicPlayerProps = {
  shouldPlay: boolean;
};

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const preference = sessionStorage.getItem(STORAGE_KEY);
    if (shouldPlay && preference !== "off") {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [shouldPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      sessionStorage.setItem(STORAGE_KEY, "off");
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      sessionStorage.setItem(STORAGE_KEY, "on");
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio ref={audioRef} src={event.audioSrc} loop preload="auto" />
      <button
        type="button"
        onClick={togglePlay}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-burgundy/85 text-champagne shadow-[0_0_18px_rgba(201,164,92,0.28)] backdrop-blur-sm transition hover:bg-maroon"
        aria-label={playing ? "Pause invitation music" : "Play invitation music"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-burgundy/80 text-champagne"
        aria-label={muted ? "Unmute invitation music" : "Mute invitation music"}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
