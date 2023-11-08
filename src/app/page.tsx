"use client";

import Timer from "@/components/molecules/timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";

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
    <main className={`w-full h-full ${rubik.className} bg-zinc-100`}>
      <div className="flex flex-col h-full w-full">
        <Timer addTime={addTime} />
        {/* <ScramblePanel
              handleGenerateScramble={handleGenerateScramble}
              scramble={scramble}
            /> */}
        <div className="grid grid-cols-3 gap-4 h-[40%]">
          <PreviewPanel scramble={scramble} />
          <TimesPanel times={times} />
          <ResumePanel times={times} />
        </div>
      </div>
    </main>
  );
}
