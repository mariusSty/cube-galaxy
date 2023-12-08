import { Time } from "@/hooks/useTimes";
import { getResult } from "@/utils/getResult";
import ResumePanel from "./ResumePanel";
import TimesPanel from "./TimesPanel";

type StatsProps = {
  times: Time[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
};

export default function Stats({
  times,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
  removeAllTimes,
}: StatsProps) {
  const results = getResult(times);

  return (
    <div className=" h-full">
      <div className="flex flex-col p-8 sm:p-12 gap-8 sm:gap-12 h-[calc(100%-60px)]">
        <ResumePanel times={times} results={results} />
        <TimesPanel
          results={results}
          removeTime={removeTime}
          removeAllTimes={removeAllTimes}
          markAsDNF={markAsDNF}
          markAsPlusTwo={markAsPlusTwo}
        />
      </div>
    </div>
  );
}
