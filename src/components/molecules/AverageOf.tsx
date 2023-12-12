import formatTimer from "@/utils/formatTime";
import { Result } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";

type AverageOfProps = {
  currentResult: Result;
};

export default function AverageOf({ currentResult }: AverageOfProps) {
  if (!currentResult) return;
  const { ao5, ao12, isAo5DNF, isAo12DNF } = currentResult;

  return (
    <div className="flex flex-wrap align-middle justify-center gap-8">
      <SimpleText color="secondary">{`ao5 : ${formatTimer(
        ao5,
        isAo5DNF
      )}`}</SimpleText>
      <SimpleText color="secondary">{`ao12 : ${formatTimer(
        ao12,
        isAo12DNF
      )}`}</SimpleText>
    </div>
  );
}
