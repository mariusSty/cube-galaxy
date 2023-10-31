"use client";

import Experience from "@/components/three/experience";
import Timer from "@/components/web/timer";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col bg-red-500 h-full">
        <Timer />
        <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [6, 3, 10] }}>
          <Experience dimension={3} />
        </Canvas>
      </div>
    </main>
  );
}
