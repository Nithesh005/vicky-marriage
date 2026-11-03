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
        audio.volume = 0.85;
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
    audio.volume = 0.85;
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
      className="fixed bottom-5 right-5 z-40 flex items-center gap-1 rounded-full border border-gold/35 bg-burgundy/75 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md"
    >
      <audio ref={audioRef} src={event.audioSrc} loop preload="metadata" />
      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full text-champagne transition hover:bg-maroon active:scale-95"
        aria-label={playing ? "Pause invitation music" : "Play invitation music"}
        aria-pressed={playing}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full text-champagne transition hover:bg-maroon active:scale-95"
        aria-label={muted ? "Unmute invitation music" : "Mute invitation music"}
        aria-pressed={muted}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
