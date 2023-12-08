import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import TimeResult from "./TimeResult";
import TimesTableThead from "./TimesTableThead";

type TimesTableProps = {
  results: Result[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
  setTimeFocused: (id: string) => void;
};

export default function TimesTable({
  results,
  removeTime,
  removeAllTimes,
  markAsDNF,
  markAsPlusTwo,
  setTimeFocused,
}: TimesTableProps) {
  const swiper = useSwiper();

  function handleDetails(id: string) {
    setTimeFocused(id);
    swiper.slideNext();
  }

  const bestTime = Math.min(
    ...results.filter((result) => !result.isDNF).map((result) => result.time)
  );

  const bestAo5 = results
    .map((result) => result.ao5)
    .reduce((prevAo5, currentAo5) => {
      if (!prevAo5) return currentAo5;
      if (!currentAo5) return prevAo5;
      return currentAo5 < prevAo5 ? currentAo5 : prevAo5;
    }, null);

  const bestAo12 = results
    .map((result) => result.ao12)
    .reduce((prevAo5, currentAo5) => {
      if (!prevAo5) return currentAo5;
      if (!currentAo5) return prevAo5;
      return currentAo5 < prevAo5 ? currentAo5 : prevAo5;
    }, null);

  return (
    <div className="h-full overflow-y-auto">
      <TimesTableThead removeAllTimes={removeAllTimes} />
      {results.map((result) => (
        <TimeResult
          key={result.id}
          result={result}
          bestTime={bestTime}
          bestAo5={bestAo5}
          bestAo12={bestAo12}
          handleDetails={handleDetails}
          removeTime={removeTime}
          markAsDNF={markAsDNF}
          markAsPlusTwo={markAsPlusTwo}
        />
      ))}
    </div>
  );
}
