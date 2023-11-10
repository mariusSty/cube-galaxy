import { Time } from "@/app/page";
import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";
import Td from "../atoms/Td";
import Tr from "../atoms/Tr";

type TimesPanelProps = {
  times: Time[];
  markAsDNF: (id: string) => void;
  removeTime: (id: string) => void;
};

export default function TimesPanel({
  times,
  markAsDNF,
  removeTime,
}: TimesPanelProps) {
  const result = [...times]
    .sort((timeA, timeB) => timeA.createdAt - timeB.createdAt)
    .reverse()
    .map((time, index) => {
      const position = times.length - index;
      const ao5 = getAverageOf(times, position);
      const ao12 = getAverageOf(times, position, 12);

      return {
        id: time.id,
        position,
        time: time.isDNF ? "DNF" : formatTimer(time.value),
        ao5,
        ao12,
        isDNF: time.isDNF,
      };
    });

  return (
    <div className="row-start-3 lg:row-start-2 xl:row-start-1 h-full min-h-[400px] p-4">
      <Tr isThead>
        <Td>
          <SimpleText isTextSecondary>N°</SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary>Time</SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary>ao5</SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary>ao12</SimpleText>
        </Td>
      </Tr>

      <div className="overflow-y-auto h-[calc(100%-70px)]">
        {result.map(({ id, position, time, ao5, ao12, isDNF }) => (
          <Tr key={id}>
            <Td>
              <SimpleText isTextSecondary>{`${position}`}</SimpleText>
            </Td>
            <Td>
              <SimpleText isTextSecondary>{time}</SimpleText>
            </Td>
            <Td>
              <SimpleText isTextSecondary>{ao5}</SimpleText>
            </Td>
            <Td>
              <SimpleText isTextSecondary>{ao12}</SimpleText>
            </Td>
            <Td>
              <button
                onClick={() => markAsDNF(id)}
                className="hover:text-blue-400"
              >
                <SimpleText isTextSecondary>{isDNF ? "OK" : "DNF"}</SimpleText>
              </button>
            </Td>
            <Td>
              <button
                onClick={() => removeTime(id)}
                className="flex items-center justify-center text-blue-600 hover:text-blue-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </Td>
          </Tr>
        ))}
      </div>
    </div>
  );
}
