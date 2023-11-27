import { Time } from "@/hooks/useTimes";
import { getAverage, getBest, getWorst } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";
import ResumeBox from "../molecules/ResumeBox";

type ResumePanelProps = {
  times: Time[];
};

export default function ResumePanel({ times }: ResumePanelProps) {
  const best = getBest(times);
  const worst = getWorst(times);
  const average = getAverage(times);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-8">
      <ResumeBox isColspan>
        <SimpleText size="small">Solve</SimpleText>
        <SimpleText size="big">{`${times.length}`}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Average</SimpleText>
        <SimpleText size="big">{average}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Best</SimpleText>
        <SimpleText size="big">{best}</SimpleText>
      </ResumeBox>
      <ResumeBox>
        <SimpleText size="small">Worst</SimpleText>
        <SimpleText size="big">{worst}</SimpleText>
      </ResumeBox>
    </div>
  );
}
