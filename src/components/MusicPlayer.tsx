"use client";

import { event } from "@/data/event";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MusicPlayerProps = {
  shouldPlay: boolean;
};

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userStopped = useRef(false);
  const userMuted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;

    userStopped.current = false;
    userMuted.current = false;
    let detachGesture = () => {};

    const playWithSound = () => {
      if (userStopped.current) return Promise.resolve();
      if (!userMuted.current) {
        audio.muted = false;
        audio.volume = 1;
        setMuted(false);
      }
      return audio.play().then(() => {
        if (userStopped.current) {
          audio.pause();
          setPlaying(false);
          return;
        }
        setPlaying(true);
        setMuted(audio.muted);
        detachGesture();
      });
    };

    const onGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-music-controls]")) return;
      playWithSound().catch(() => setPlaying(false));
    };

    playWithSound().catch(() => {
      setPlaying(false);
      const options: AddEventListenerOptions = { capture: true };
      window.addEventListener("pointerdown", onGesture, options);
      window.addEventListener("keydown", onGesture, options);
      detachGesture = () => {
        window.removeEventListener("pointerdown", onGesture, options);
        window.removeEventListener("keydown", onGesture, options);
      };
    });

    return () => detachGesture();
  }, [shouldPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      userStopped.current = true;
      audio.pause();
      setPlaying(false);
      return;
    }
    userStopped.current = false;
    userMuted.current = false;
    audio.muted = false;
    audio.volume = 1;
    setMuted(false);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    userMuted.current = audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div
      data-music-controls
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
    >
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
