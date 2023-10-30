"use client";

import Cube from "@/components/three/cube";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Canvas>
        <color args={["ivory"]} attach="background" />
        <OrbitControls makeDefault />
        <Stage>
          <Cube />
        </Stage>
      </Canvas>
    </main>
  );
}
