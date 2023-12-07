import { Time } from "@/hooks/useTimes";
import { getResult } from "@/utils/getResult";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TimeDetails from "./TimeDetails";
import TimesTable from "./TimesTable";

type TimesPanelProps = {
  times: Time[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
};

export default function TimesPanel({
  times,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
  removeAllTimes,
}: TimesPanelProps) {
  const [focusedId, setFocusedId] = useState<string>();

  const results = getResult(times);

  function updateTimeFocused(id: string) {
    setFocusedId(id);
  }

  return (
    <div className="h-full bg-[#151E3F] rounded-2xl p-4 overflow-y-auto">
      <Swiper
        allowTouchMove={false}
        className="w-full"
        runCallbacksOnInit={false}
      >
        <SwiperSlide>
          <TimesTable
            results={results}
            markAsDNF={markAsDNF}
            markAsPlusTwo={markAsPlusTwo}
            removeTime={removeTime}
            removeAllTimes={removeAllTimes}
            setTimeFocused={updateTimeFocused}
          />
        </SwiperSlide>
        <SwiperSlide>
          {focusedId && (
            <TimeDetails
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
