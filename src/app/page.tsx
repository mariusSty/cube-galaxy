"use client";

import Experience from "@/components/three/experience";
import ScramblePanel from "@/components/web/scramblePanel";
import Timer from "@/components/web/timer";
import formatTimer from "@/utils/format-timer";
import { Canvas } from "@react-three/fiber";
import { Bebas_Neue } from "next/font/google";
import { useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

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
    <main className={`w-full h-full ${bebas.className}`}>
      <div className="flex flex-col bg-zinc-100 h-full">
        <Timer addTime={addTime} />
        <ScramblePanel
          handleGenerateScramble={handleGenerateScramble}
          scramble={scramble}
        />
        <div className="flex h-full">
          <Canvas
            camera={{ fov: 45, near: 0.1, far: 200, position: [6, 3, 10] }}
          >
            <Experience dimension={3} scramble={scramble} />
          </Canvas>
          <div className="grid p-6 min-w-[40%]">
            <div className="grid grid-cols-1 auto-rows-[50px] border-4 border-blue-600 rounded-lg p-4">
              {[...times].reverse().map((time, index) => (
                <div
                  className="flex justify-start items-center gap-3 text-3xl text-blue-600"
                  key={index}
                >
                  <span>{formatTimer(time)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
