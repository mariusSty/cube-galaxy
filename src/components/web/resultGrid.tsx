import calculateAverage from "@/utils/calculate-average";
import formatTimer from "@/utils/format-timer";

type ResultGridProps = {
  times: number[];
};

export default function ResultGrid({ times }: ResultGridProps) {
  const best = times.length > 0 ? formatTimer(Math.min(...times)) : null;
  const worst = times.length > 0 ? formatTimer(Math.max(...times)) : null;
  const result = [...times].reverse().map((time, index) => {
    const position = times.length - index;
    const ao5 = calculateAverage(times, position);
    const ao12 = calculateAverage(times, position, 12);
    return {
      position,
      time: formatTimer(time),
      ao5: ao5 ? formatTimer(ao5) : "NA",
      ao12: ao12 ? formatTimer(ao12) : "NA",
    };
  });

  return (
    <div className="flex flex-col p-6 h-full min-w-[40%] text-blue-600">
      <div className="flex flex-col h-20">
        <div className="text-3xl border-2 rounded-lg border-blue-600">
          Resolution : {times.length}
        </div>
        <div className="flex justify-between">
          <div className="text-xl border-2 rounded-lg border-blue-600 p-2">
            Best : {best ?? "NA"}
          </div>
          <div className="text-xl border-2 rounded-lg border-blue-600 p-2">
            Worst : {worst ?? "NA"}
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-5rem)]">
        <div className="flex w-full sticky top-0 text-3xl border-b-2 border-blue-600">
          <div className="flex justify-center items-center p-4 p-l8 w-24">
            N°
          </div>
          <div className="flex justify-center items-center p-4 p-l8 w-full">
            Time
          </div>
          <div className="flex justify-center items-center p-4 p-l8 w-24">
            ao5
          </div>
          <div className="flex justify-center items-center p-4 p-l8 w-24">
            ao12
          </div>
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
    </div>
  );
}
