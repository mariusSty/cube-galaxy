import { Result } from "@/types/timer";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TimeDetailsPanel from "./TimeDetailsPanel";
import TimesTable from "./TimesTable";

type TimesPanelProps = {
  results: Result[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
};

export default function TimesPanel({
  results,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
  removeAllTimes,
}: TimesPanelProps) {
  const [focusedId, setFocusedId] = useState<string>();

  function updateTimeFocused(id: string) {
    setFocusedId(id);
  }

  return (
    <div className="h-full bg-lightBackground rounded-2xl p-4 overflow-y-auto">
      <Swiper
        allowTouchMove={false}
        className="w-full h-full"
        runCallbacksOnInit={false}
      >
        <SwiperSlide>
          <TimesTable
            results={results}
            markAsDNF={markAsDNF}
            markAsPlusTwo={markAsPlusTwo}
            removeAllTimes={removeAllTimes}
            setTimeFocused={updateTimeFocused}
          />
        </SwiperSlide>
        <SwiperSlide>
          {focusedId && (
            <TimeDetailsPanel
              results={results}
              focusedId={focusedId}
              markAsDNF={markAsDNF}
              markAsPlusTwo={markAsPlusTwo}
              removeTime={removeTime}
            />
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
