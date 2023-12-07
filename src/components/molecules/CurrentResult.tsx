import { Time } from "@/hooks/useTimes";
import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";

type CurrentResultProps = {
  times: Time[];
};

export default function CurrentResult({ times }: CurrentResultProps) {
  const ao5 = getAverageOf(times, times.length);
  const ao12 = getAverageOf(times, times.length, 12);

  return (
    <div className="flex flex-col w-[80%] sm:w-auto absolute left-1/2 -translate-x-1/2 bottom-20 p-4 gap-2 bg-[#030027] border-[1px] border-[#F6511D] rounded-2xl">
      <div className="flex justify-start align-middle gap-2">
        <SimpleText size="big">ao5 : </SimpleText>
        <SimpleText size="big">{formatTimer(ao5)}</SimpleText>
      </div>
      <div className="flex justify-start align-middle gap-2">
        <SimpleText size="big">ao12 : </SimpleText>
        <SimpleText size="big">{formatTimer(ao12)}</SimpleText>
      </div>
    </div>
  );
}
