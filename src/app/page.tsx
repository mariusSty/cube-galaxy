"use client";

import Cube from "@/components/three/cube";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const dimension = 2;
  const positions = [];
  for (let i = 0; i < Math.pow(dimension, 3); i++) {
    positions.push(Array.from((i >>> 0).toString(dimension).padStart(3, "0")));
  }

  const cubes = positions.map((position, index) => (
    <Cube key={index} position={position} />
  ));

  return (
    <main className="w-full h-full">
      <Canvas>
        <color args={["ivory"]} attach="background" />
        <OrbitControls makeDefault />
        <Stage>{cubes}</Stage>
      </Canvas>
    </main>
  );
}
