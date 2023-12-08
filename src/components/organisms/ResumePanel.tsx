import { Time } from "@/hooks/useTimes";
import formatTimer from "@/utils/formatTime";
import { Result, getAverage, getBest, getWorst } from "@/utils/getResult";
import ResumeBox from "../atoms/ResumeBox";
import SimpleText from "../atoms/SimpleText";

type ResumePanelProps = {
  times: Time[];
  results: Result[];
};

export default function ResumePanel({ times, results }: ResumePanelProps) {
  const best = getBest(times);
  const worst = getWorst(times);
  const average = getAverage(times);

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
    <div className="grid grid-cols-3 gap-2 sm:gap-8">
      <ResumeBox>
        <SimpleText size="small">Solve</SimpleText>
        <SimpleText size="big">{`${times.length}`}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Best</SimpleText>
        <SimpleText size="big">{formatTimer(best)}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Worst</SimpleText>
        <SimpleText size="big">{formatTimer(worst)}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Average</SimpleText>
        <SimpleText size="big">{formatTimer(average)}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Best ao5</SimpleText>
        <SimpleText size="big">{formatTimer(bestAo5)}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Best ao12</SimpleText>
        <SimpleText size="big">{formatTimer(bestAo12)}</SimpleText>
      </ResumeBox>
    </div>
  );
}
