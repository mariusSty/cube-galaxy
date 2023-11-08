import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import SimpleText from "../atoms/SimpleText";
import Td from "../atoms/Td";
import Tr from "../atoms/Tr";

type TimesPanelProps = {
  times: number[];
};

export default function TimesPanel({ times }: TimesPanelProps) {
  const result = [...times].reverse().map((time, index) => {
    const position = times.length - index;
    const ao5 = getAverageOf(times, position, 5);
    const ao12 = getAverageOf(times, position, 12);
    return {
      position,
      time: formatTimer(time),
      ao5: ao5 ? formatTimer(ao5) : "-",
      ao12: ao12 ? formatTimer(ao12) : "-",
    };
  });

  return (
    <div className="h-full">
      <Tr border={2}>
        <Td>
          <SimpleText isTextSecondary size={4}>
            N°
          </SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary size={4}>
            Time
          </SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary size={4}>
            ao5
          </SimpleText>
        </Td>
        <Td>
          <SimpleText isTextSecondary size={4}>
            ao12
          </SimpleText>
        </Td>
      </Tr>
      <div className="h-[calc(100%-5rem)] overflow-y-auto">
        {result.map(({ position, time, ao5, ao12 }) => (
          <Tr key={position}>
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
          </Tr>
        ))}
      </div>
    </div>
  );
}
