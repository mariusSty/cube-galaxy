"use client";

import Experience from "@/components/three/experience";
import ScramblePanel from "@/components/web/scramblePanel";
import Timer from "@/components/web/timer";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const scrambles = [
  ["F", "R", "U", "F'", "R"],
  ["F", "R", "F", "U'", "D"],
  ["R", "D", "U", "D'", "R"],
  ["F'", "D", "U", "F'", "D'"],
];

export default function Home() {
  const [scramble, setScramble] = useState<string[] | null>(null);

  const handleGenerateScramble = () => {
    setScramble(scrambles[Math.round(Math.random() * (scrambles.length - 1))]);
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col bg-zinc-100 h-full">
        <Timer />
        <ScramblePanel
          handleGenerateScramble={handleGenerateScramble}
          scramble={scramble}
        />
        <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [6, 3, 10] }}>
          <Experience dimension={3} scramble={scramble} />
        </Canvas>
      </div>
    </main>
  );
}
