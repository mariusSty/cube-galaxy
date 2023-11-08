import formatTimer from "@/utils/formatTime";
import { getAverage, getBest, getWorst } from "@/utils/getResult";

type ResumePanelProps = {
  times: number[];
};

export default function ResumePanel({ times }: ResumePanelProps) {
  const best = getBest(times);
  const worst = getWorst(times);
  const average = getAverage(times);

  return (
    <div className="grid grid-cols-3 gap-4 h-32 p-4">
      <div className="flex justify-center items-center col-span-3 text-3xl p-2 rounded-lg bg-gradient-to-b from-blue-600 to-blue-500">
        <span>Solve : {times.length}</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xl rounded-lg bg-gradient-to-b from-blue-600 to-blue-500">
        <span>Average</span>
        <span className="text-2xl">{average ? formatTimer(average) : "-"}</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xl rounded-lg p-2 bg-gradient-to-b from-blue-600 to-blue-500">
        <span>Best</span>
        <span className="text-2xl">{best ? formatTimer(best) : "-"}</span>
      </div>
      <div className="flex flex-col justify-center items-center text-xl rounded-lg p-2 bg-gradient-to-b from-blue-600 to-blue-500">
        <span>Worst</span>
        <span className="text-2xl">{worst ? formatTimer(worst) : "-"}</span>
      </div>
    </div>
  );
}
