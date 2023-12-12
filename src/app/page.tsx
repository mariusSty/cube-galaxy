"use client";

import CloseToastButton from "@/components/molecules/CloseToastButton";
import Experience from "@/components/molecules/Experience";
import Timer from "@/components/molecules/Timer";
import AppTemplate from "@/components/organisms/AppTemplate";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimerInformations from "@/components/organisms/TimerInformations";
import TimesPanel from "@/components/organisms/TimesPanel";
import useTimer, { TimerState } from "@/hooks/useTimer";
import { useTimes } from "@/hooks/useTimes";
import { getResult } from "@/utils/getResult";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Scrambow } from "scrambow";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });
const scrambow = new Scrambow();

export default function Home() {
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);

  const {
    times,
    addTime,
    markAsDNF,
    markAsPlusTwo,
    removeAllTimes,
    removeTime,
  } = useTimes();

  const handleGenerateScramble = useCallback(function () {
    const scramble3x3 = scrambow.get();
    const scramble = scramble3x3[0].scramble_string
      .split(" ")
      .filter((scramble) => scramble !== "");
    setCurrentScramble(scramble);
  }, []);

  const handleStop = useCallback(
    function (newTime: number) {
      addTime(newTime, currentScramble);
      handleGenerateScramble();
    },
    [addTime, handleGenerateScramble, currentScramble]
  );

  const {
    timerValue,
    timerState,
    readyTimer,
    startTimer,
    liberateTimer,
    stopTimer,
  } = useTimer({
    handleStop,
  });

  function handleCopyToClipBoard() {
    if (!currentScramble) return;
    navigator.clipboard.writeText(currentScramble.join(" "));
    toast.info(<span className={rubik.className}>Scramble copied !</span>, {
      position: toast.POSITION.BOTTOM_CENTER,
      toastId: "copy-id",
      theme: "dark",
      icon: false,
    });
  }

  const results = getResult(times);
  const isTimerFocused = timerState !== TimerState.Stop;
  const lastResult = results[0];

  useEffect(() => {
    handleGenerateScramble();
  }, [handleGenerateScramble]);

  return (
    <main
      className={`w-full h-full bg-[#030027] ${rubik.className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <AppTemplate
        renderPreviewPanel={() => (
          <Canvas
            camera={{ fov: 45, near: 0.1, far: 200, position: [6, 4, 8] }}
          >
            <Experience scramble={currentScramble} />
          </Canvas>
        )}
        renderResumePanel={() => (
          <ResumePanel times={times} results={results} />
        )}
        renderTimerPanel={() => (
          <Timer
            readyTimer={readyTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            liberateTimer={liberateTimer}
            timerState={timerState}
            renderTimerDigit={() => (
              <TimerInformations
                isTimerFocused={isTimerFocused}
                timerValue={timerValue}
                currentScramble={currentScramble}
                times={times}
                lastResult={lastResult}
              />
            )}
          />
        )}
        renderTimesPanel={() => (
          <TimesPanel
            results={results}
            removeTime={removeTime}
            removeAllTimes={removeAllTimes}
            markAsDNF={markAsDNF}
            markAsPlusTwo={markAsPlusTwo}
          />
        )}
        isTimerFocused={isTimerFocused}
      />

      <ToastContainer closeButton={CloseToastButton} />
    </main>
  );
}
