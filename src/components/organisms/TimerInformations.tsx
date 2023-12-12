import { Result, Time } from "@/types/timer";
import formatTimer from "@/utils/formatTime";
import NumberText from "../atoms/NumberText";
import AverageOf from "../molecules/AverageOf";
import CurrentResultDiff from "../molecules/CurrentResultDiff";
import Scramble from "../molecules/Scramble";

type TimerInformationProps = {
  timerValue: string;
  currentScramble: string[];
  times: Time[];
  isTimerFocused: boolean;
  lastResult: Result;
};

export default function TimerInformations({
  timerValue,
  currentScramble,
  times,
  isTimerFocused,
  lastResult,
}: TimerInformationProps) {
  let timesDiff: number | null = null;
  if (times.length > 1) {
    const [last, prelast] = times
      .toSorted((timeA, timeB) => timeA.createdAt - timeB.createdAt)
      .slice(-2);
    timesDiff = prelast.value - last.value;
  }
  const isBetterThanPrevious = !!timesDiff && timesDiff < 0;
  const currentResult = lastResult
    ? formatTimer(lastResult.time, lastResult.isDNF)
    : timerValue;

  return (
    <>
      <NumberText size="veryBig" color="secondary">
        {isTimerFocused ? timerValue : currentResult}
      </NumberText>
      {!isTimerFocused && timesDiff && (
        <CurrentResultDiff
          isBetterThanPrevious={isBetterThanPrevious}
          value={timesDiff}
        />
      )}
      {!isTimerFocused && (
        <div className="flex flex-col gap-2">
          <Scramble scramble={currentScramble} />
          <AverageOf currentResult={lastResult} />
        </div>
      )}
    </>
  );
}
