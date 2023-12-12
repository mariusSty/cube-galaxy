import { Time } from "@/hooks/useTimes";
import NumberText from "../atoms/NumberText";
import CurrentAverageOf from "../molecules/CurrentAverageOf";
import CurrentResultDiff from "../molecules/CurrentResultDiff";
import CurrentScramble from "../molecules/CurrentScramble";

type TimerInformationProps = {
  currentResult: string;
  currentScramble: string[];
  times: Time[];
  isTimerFocused: boolean;
};

export default function TimerInformations({
  currentResult,
  currentScramble,
  times,
  isTimerFocused,
}: TimerInformationProps) {
  let timesDiff: number | null = null;
  if (times.length > 1) {
    const [last, prelast] = times
      .toSorted((timeA, timeB) => timeA.createdAt - timeB.createdAt)
      .slice(-2);
    timesDiff = prelast.value - last.value;
  }
  const isBetterThanPrevious = !!timesDiff && timesDiff < 0;

  return (
    <>
      <NumberText size="big" color="yellow">
        {currentResult}
      </NumberText>
      {!isTimerFocused && timesDiff && (
        <CurrentResultDiff
          isBetterThanPrevious={isBetterThanPrevious}
          value={timesDiff}
        />
      )}
      {!isTimerFocused && (
        <div className="flex flex-col gap-2">
          <CurrentScramble currentScramble={currentScramble} />
          <CurrentAverageOf times={times} />
        </div>
      )}
    </>
  );
}
