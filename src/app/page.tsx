"use client";

import NumberText from "@/components/atoms/NumberText";
import CloseToastButton from "@/components/molecules/CloseToastButton";
import CurrentResult from "@/components/molecules/CurrentResult";
import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import SwiperMenu from "@/components/molecules/SwiperMenu";
import Timer from "@/components/molecules/Timer";
import TimesDiff from "@/components/molecules/TimesDiff";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
import useTimer, { TimerState } from "@/hooks/useTimer";
import { useTimes } from "@/hooks/useTimes";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
      addTime(newTime, currentScramble);
      handleGenerateScramble();
    },
    [addTime, handleGenerateScramble, currentScramble]
  );

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

  let timesDiff: number | null = null;
  if (times.length > 1) {
    timesDiff = times[times.length - 1].value - times[times.length - 2].value;
  }

  const isBetterThanPrevious = !!timesDiff && timesDiff < 0;
  const isTimerFocused = timerState !== TimerState.Stop;

  useEffect(() => {
    handleGenerateScramble();
  }, [handleGenerateScramble]);

  return (
    <main
      className={`w-full h-full bg-[#030027] ${rubik.className}`}
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
          <div className=" h-full">
            <div className="flex flex-col p-8 sm:p-12 gap-8 sm:gap-12 h-[calc(100%-60px)]">
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
              handleCopyToClipBoard={handleCopyToClipBoard}
              scramble={currentScramble}
            />
          )}
          <Timer
            readyTimer={readyTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            liberateTimer={liberateTimer}
            timerState={timerState}
            renderTimerDigit={() => (
              <>
                <NumberText size="big" color="yellow">
                  {currentResult}
                </NumberText>
                {!isTimerFocused && timesDiff && (
                  <TimesDiff
                    isBetterThanPrevious={isBetterThanPrevious}
                    value={timesDiff}
                  />
                )}
              </>
            )}
          />
          {!isTimerFocused && <CurrentResult times={times} />}
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

      <ToastContainer closeButton={CloseToastButton} />
    </main>
  );
}
