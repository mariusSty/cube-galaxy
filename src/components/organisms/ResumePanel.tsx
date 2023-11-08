import formatTimer from "@/utils/formatTime";
import { getAverage, getBest, getWorst } from "@/utils/getResult";
import NumberText from "../atoms/NumberText";
import SimpleText from "../atoms/SimpleText";
import ResumeBox from "../molecules/ResumeBox";

type ResumePanelProps = {
  times: number[];
};

export default function ResumePanel({ times }: ResumePanelProps) {
  const best = getBest(times);
  const worst = getWorst(times);
  const average = getAverage(times);

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <ResumeBox colspan={3}>
        <SimpleText size={5}>Solve</SimpleText>
        <NumberText size={7}>{`${times.length}`}</NumberText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText>Average</SimpleText>
        <NumberText>{average ? formatTimer(average) : "-"}</NumberText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText>Best</SimpleText>
        <NumberText>{best ? formatTimer(best) : "-"}</NumberText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText>Worst</SimpleText>
        <NumberText>{worst ? formatTimer(worst) : "-"}</NumberText>
      </ResumeBox>
    </div>
  );
}
