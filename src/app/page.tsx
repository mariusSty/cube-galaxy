"use client";

import Experience from "@/components/three/experience";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Canvas>
        <Experience dimension={3} />
      </Canvas>
    </main>
  );
}
