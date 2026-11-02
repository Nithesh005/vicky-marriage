"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function TwinRings() {
  const group = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.45;
      group.current.rotation.x = 0.45;
    }
  });

  return (
    <mesh ref={group}>
      <torusGeometry args={[1.05, 0.12, 24, 72]} />
      <meshStandardMaterial
        color="#C9A45C"
        metalness={0.95}
        roughness={0.22}
        emissive="#8d6b2f"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

export default function GoldRing() {
  return (
    <div className="mx-auto h-40 w-40 md:h-52 md:w-52" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff4d6" />
        <pointLight position={[-2, -1, 2]} intensity={0.6} color="#C9A45C" />
        <TwinRings />
      </Canvas>
    </div>
  );
}
