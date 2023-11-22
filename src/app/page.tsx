"use client";

import Experience from "@/components/molecules/Experience";
import Scramble from "@/components/molecules/Scramble";
import SwiperMenu from "@/components/molecules/SwiperMenu";
import Timer from "@/components/molecules/Timer";
import PreviewPanel from "@/components/organisms/PreviewPanel";
import ResumePanel from "@/components/organisms/ResumePanel";
import TimesPanel from "@/components/organisms/TimesPanel";
import { useTimes } from "@/hooks/useTimes";
import { Canvas } from "@react-three/fiber";
import { Rubik } from "next/font/google";
import { useState } from "react";
import { Scrambow } from "scrambow";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });

export default function Home() {
  const [currentScramble, setCurrentScramble] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);

  const {
    times,
    addTime,
    markAsDNF,
    markAsPlusTwo,
    removeAllTimes,
    removeTime,
  } = useTimes();

  const handleGenerateScramble = () => {
    const scrambow = new Scrambow();
    const scramble3x3 = scrambow.get();
    const scramble = scramble3x3[0].scramble_string
      .split(" ")
      .filter((scramble) => scramble !== "");
    setCurrentScramble(scramble);
  };

  return (
    <main className={`w-full h-full ${rubik.className}`}>
      <Swiper
        allowTouchMove={false}
        className="w-full h-full"
        initialSlide={1}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      >
        <SwiperSlide>
          <ResumePanel times={times} />
          <TimesPanel
            times={times}
            removeTime={removeTime}
            removeAllTimes={removeAllTimes}
            markAsDNF={markAsDNF}
            markAsPlusTwo={markAsPlusTwo}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Timer addTime={addTime} handleSwiperEnabled={setIsMenuVisible}>
            <Scramble
              handleGenerateScramble={handleGenerateScramble}
              scramble={currentScramble}
            />
          </Timer>
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
        {isMenuVisible && <SwiperMenu activeSlide={activeSlide} />}
      </Swiper>
    </main>
  );
}
