import { Time } from "@/hooks/useTimes";
import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";

type CurrentAverageOfProps = {
  times: Time[];
};

export default function CurrentAverageOf({ times }: CurrentAverageOfProps) {
  const ao5 = getAverageOf(times, times.length);
  const ao12 = getAverageOf(times, times.length, 12);

  return (
    <div className="flex align-middle justify-center gap-8">
      <div className="flex justify-start align-middle gap-2">
        <SimpleText color="yellow" size="big">{`ao5 : ${formatTimer(
          ao5
        )}`}</SimpleText>
      </div>
      <div className="flex justify-start align-middle gap-2">
        <SimpleText color="yellow" size="big">{`ao12 : ${formatTimer(
          ao12
        )}`}</SimpleText>
      </div>
    </div>
  );
}
