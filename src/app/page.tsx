"use client";

import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import SwiperMenu from "@/components/molecules/SwiperMenu";
import Timer from "@/components/molecules/Timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
import useTimer, { TimerState } from "@/hooks/useTimer";
import { useTimes } from "@/hooks/useTimes";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { Scrambow } from "scrambow";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });
const scrambow = new Scrambow();

export default function Home() {
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(1);

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
      addTime(newTime);
      handleGenerateScramble();
    },
    [addTime, handleGenerateScramble]
  );

  const {
    currentResult,
    timerState,
    readyTimer,
    startTimer,
    liberateTimer,
    stopTimer,
  } = useTimer({
    handleStop,
  });

  const isTimerFocused = timerState !== TimerState.Stop;

  useEffect(() => {
    handleGenerateScramble();
  }, [handleGenerateScramble]);

  return (
    <main
      className={`w-full h-full ${rubik.className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Swiper
        allowTouchMove={false}
        className="w-full h-full"
        initialSlide={1}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        runCallbacksOnInit={false}
      >
        <SwiperSlide>
          <div className="bg-[#030027] h-full">
            <div className="flex flex-col p-8 sm:p-12 gap-8 sm:gap-12 h-[calc(100%-100px)]">
              <ResumePanel times={times} />
              <TimesPanel
                times={times}
                removeTime={removeTime}
                removeAllTimes={removeAllTimes}
                markAsDNF={markAsDNF}
                markAsPlusTwo={markAsPlusTwo}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {!isTimerFocused && (
            <Scramble
              handleGenerateScramble={handleGenerateScramble}
              scramble={currentScramble}
            />
          )}
          <Timer
            readyTimer={readyTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            liberateTimer={liberateTimer}
            timerState={timerState}
            currentResult={currentResult}
          />
        </SwiperSlide>
        <SwiperSlide>
          <PreviewPanel>
            <Canvas
              camera={{ fov: 45, near: 0.1, far: 200, position: [6, 4, 8] }}
            >
              <Experience scramble={currentScramble} />
            </Canvas>
          </PreviewPanel>
        </SwiperSlide>
        {!isTimerFocused && <SwiperMenu activeSlide={activeSlide} />}
      </Swiper>
    </main>
  );
}
