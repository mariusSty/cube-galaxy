"use client";

import Experience from "@/components/three/experience";
import ResultGrid from "@/components/web/resultGrid";
import ScramblePanel from "@/components/web/scramblePanel";
import Timer from "@/components/web/timer";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useState } from "react";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });

const scrambles = [
  ["F", "R", "U", "F'", "R"],
  ["F", "R", "F", "U'", "D"],
  ["R", "D", "U", "D'", "R"],
  ["F'", "D", "U", "F'", "D'"],
];

export default function Home() {
  const [scramble, setScramble] = useState<string[] | null>(null);
  const [times, setTimes] = useState<number[]>([]);

  const handleGenerateScramble = () => {
    setScramble(scrambles[Math.round(Math.random() * (scrambles.length - 1))]);
  };

  const addTime = (time: number) => {
    setTimes([...times, time]);
  };

  return (
    <main className={`w-full h-full ${rubik.className}`}>
      <div className="flex flex-col bg-zinc-100 h-screen">
        <Timer addTime={addTime} />
        <div className="flex h-[60%]">
          <div className="flex flex-col w-full">
            <ScramblePanel
              handleGenerateScramble={handleGenerateScramble}
              scramble={scramble}
            />
            <Canvas
              camera={{ fov: 45, near: 0.1, far: 200, position: [6, 3, 10] }}
            >
              <Experience dimension={3} scramble={scramble} />
            </Canvas>
          </div>
          <ResultGrid times={times} />
        </div>
      </div>
    </main>
  );
}
