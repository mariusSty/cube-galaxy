"use client";

import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import Timer from "@/components/molecules/Timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
import { useTimer } from "@/hooks/useTimer";
import { generateScramble } from "@/utils/generateScramble";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useState } from "react";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });

export default function Home() {
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);
  const {
    times,
    addTime,
    markAsDNF,
    markAsPlusTwo,
    removeAllTimes,
    removeTime,
  } = useTimer();

  const handleGenerateScramble = () => {
    const scramble = generateScramble();
    setCurrentScramble(scramble);
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
        <div className="grid grid-cols-1 xl:col-span-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-[40%]">
          <TimesPanel
            times={times}
            removeTime={removeTime}
            removeAllTimes={removeAllTimes}
            markAsDNF={markAsDNF}
            markAsPlusTwo={markAsPlusTwo}
          />
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
