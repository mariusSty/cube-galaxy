"use client";

import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import Timer from "@/components/molecules/Timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
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
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);
  const [times, setTimes] = useState<number[]>([]);

  const handleGenerateScramble = () => {
    setCurrentScramble(
      scrambles.filter((scramble) => scramble !== currentScramble)[
        Math.round(Math.random() * (scrambles.length - 2))
      ]
    );
  };

  const addTime = (time: number) => {
    setTimes([...times, time]);
  };

  return (
    <main className={`w-full h-full ${rubik.className}`}>
      <div className="flex flex-col h-full w-full">
        <Timer addTime={addTime}>
          <Scramble
            handleGenerateScramble={handleGenerateScramble}
            scramble={currentScramble}
          />
        </Timer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[40%]">
          <TimesPanel times={times} />
          <PreviewPanel>
            <Canvas
              camera={{ fov: 45, near: 0.1, far: 200, position: [6, 4, 8] }}
            >
              <Experience scramble={currentScramble} />
            </Canvas>
          </PreviewPanel>
          <ResumePanel times={times} />
        </div>
      </div>
    </main>
  );
}
