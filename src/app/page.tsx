"use client";

import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import Timer from "@/components/molecules/Timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
import { Canvas } from "@react-three/fiber";
import { v4 as uuidv4 } from "uuid";

import { generateScramble } from "@/utils/generateScramble";
import { Rubik } from "next/font/google";
import { useState } from "react";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });

export type Time = {
  id: string;
  value: number;
  isDNF: boolean;
  createdAt: number;
  updatedAt: number;
};

export default function Home() {
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);
  const [times, setTimes] = useState<Time[]>([]);

  const handleGenerateScramble = () => {
    const scramble = generateScramble();
    setCurrentScramble(scramble);
  };

  const addTime = (value: number) => {
    const time: Time = {
      id: uuidv4(),
      value,
      isDNF: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTimes([...times, time]);
  };

  const removeTime = (id: string) => {
    setTimes(times.filter((time) => time.id !== id));
  };

  const markAsDNF = (id: string) => {
    const time = times.find((time) => time.id === id);
    if (!time) throw new Error("Can't mark as DNF, time not found");
    time.isDNF = !time.isDNF;
    time.updatedAt = Date.now();
    setTimes([...times.filter((time) => time.id !== id), time]);
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
            markAsDNF={markAsDNF}
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
