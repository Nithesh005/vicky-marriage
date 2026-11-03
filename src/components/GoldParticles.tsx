"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Particle = {
  x: number;
  y: number;
  r: number;
  s: number;
  a: number;
};

export default function GoldParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;
    let visible = true;
    let scheduled = false;
    const particles: Particle[] = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 28 : 55;
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6 + Math.random() * 1.8,
          s: 0.12 + Math.random() * 0.35,
          a: 0.15 + Math.random() * 0.45,
        });
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const schedule = () => {
      if (!running || scheduled || !visible || document.hidden) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (!running || !visible || document.hidden) return;
        const { width, height } = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        particles.forEach((particle) => {
          particle.y -= particle.s;
          particle.x += Math.sin((frame + particle.x) / 80) * 0.15;
          if (particle.y < -4) particle.y = height + 4;
          ctx.beginPath();
          ctx.fillStyle = `rgba(231, 212, 165, ${particle.a})`;
          ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
          ctx.fill();
        });
        frame += 1;
        schedule();
      });
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", schedule);
    schedule();

    return () => {
      running = false;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
