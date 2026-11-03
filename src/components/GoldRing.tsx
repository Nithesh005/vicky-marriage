"use client";

import { TwinRingsMark } from "@/components/Ornament";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function TwinRings() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group} rotation={[0.55, 0.2, 0.15]}>
      <mesh position={[-0.22, 0.04, 0]} rotation={[1.15, 0.15, 0.55]}>
        <torusGeometry args={[0.92, 0.085, 32, 90]} />
        <meshStandardMaterial
          color="#e7d4a5"
          metalness={1}
          roughness={0.18}
          emissive="#8d6b2f"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0.24, -0.02, 0.08]} rotation={[1.05, 0.4, -0.7]}>
        <torusGeometry args={[0.92, 0.08, 32, 90]} />
        <meshStandardMaterial
          color="#c9a45c"
          metalness={1}
          roughness={0.24}
          emissive="#6e5424"
          emissiveIntensity={0.16}
        />
      </mesh>
    </group>
  );
}

export default function GoldRing() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setWebgl(media.matches && !reduced);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="float-soft relative mx-auto h-40 w-40 md:h-52 md:w-52" aria-hidden="true">
      <div className="pointer-events-none absolute inset-8 rounded-full bg-gold/25 blur-2xl" />
      {webgl ? (
        <Canvas
          camera={{ position: [0, 0.1, 3.4], fov: 42 }}
          dpr={[1, 1.35]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 2]} intensity={1.6} color="#fff4d6" />
          <pointLight position={[-2, -1, 2]} intensity={0.7} color="#C9A45C" />
          <TwinRings />
        </Canvas>
      ) : (
        <TwinRingsMark className="h-full w-full" />
      )}
    </div>
  );
}
