import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";

type TimesPanelProps = {
  times: number[];
};

export default function TimesPanel({ times }: TimesPanelProps) {
  const result = [...times].reverse().map((time, index) => {
    const position = times.length - index;
    const ao5 = getAverageOf(times, position, 5);
    const ao12 = getAverageOf(times, position, 12);
    return {
      position,
      time: formatTimer(time),
      ao5: ao5 ? formatTimer(ao5) : "-",
      ao12: ao12 ? formatTimer(ao12) : "-",
    };
  });

  return (
    <div className="h-[calc(100%-8rem)]">
      <div className="flex w-full sticky top-0 text-lg lg:text-3xl border-b-2 border-blue-600">
        <div className="flex justify-center items-center p-4 p-l8">N°</div>
        <div className="flex justify-center items-center p-4 p-l8 w-full">
          Time
        </div>
        <div className="flex justify-center items-center p-4 p-l8">ao5</div>
        <div className="flex justify-center items-center p-4 p-l8">ao12</div>
      </div>
      <div className="h-[calc(100%-5rem)] overflow-y-auto text-2xl ">
        {result.map(({ position, time, ao5, ao12 }) => (
          <div
            key={position}
            className="flex h-16 border-b-[1px] border-blue-600"
          >
            <div className="flex justify-center items-center p-4 p-l8 w-24">
              {position}
            </div>
            <div className="flex justify-center items-center p-4 p-l8 w-full">
              {time}
            </div>
            <div className="flex justify-center items-center p-4 p-l8 w-24">
              {ao5}
            </div>
            <div className="flex justify-center items-center p-4 p-l8 w-24">
              {ao12}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
