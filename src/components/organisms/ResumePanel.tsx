import { Time } from "@/hooks/useTimes";
import formatTimer from "@/utils/formatTime";
import { Result, getAverage, getBest, getWorst } from "@/utils/getResult";
import Box from "../atoms/Box";
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
    <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-2 h-full">
      <Box>
        <SimpleText size="small">Solve</SimpleText>
        <SimpleText>{`${times.length}`}</SimpleText>
      </Box>
      <Box>
        <SimpleText size="small">Best</SimpleText>
        <SimpleText>{formatTimer(best)}</SimpleText>
      </Box>
      <Box>
        <SimpleText size="small">Worst</SimpleText>
        <SimpleText>{formatTimer(worst)}</SimpleText>
      </Box>
      <Box>
        <SimpleText size="small">Average</SimpleText>
        <SimpleText>{formatTimer(average)}</SimpleText>
      </Box>
      <Box>
        <SimpleText size="small">Best ao5</SimpleText>
        <SimpleText>{formatTimer(bestAo5)}</SimpleText>
      </Box>
      <Box>
        <SimpleText size="small">Best ao12</SimpleText>
        <SimpleText>{formatTimer(bestAo12)}</SimpleText>
      </Box>
    </div>
  );
}
