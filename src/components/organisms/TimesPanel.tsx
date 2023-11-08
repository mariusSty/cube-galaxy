import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import NumberText from "../atoms/NumberText";
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
    <div className="h-full min-h-[400px] lg:min-h-full p-4">
      <div>
        <Tr isThead>
          <Td>
            <SimpleText isTextSecondary size="big">
              N°
            </SimpleText>
          </Td>
          <Td>
            <SimpleText isTextSecondary size="big">
              Time
            </SimpleText>
          </Td>
          <Td>
            <SimpleText isTextSecondary size="big">
              ao5
            </SimpleText>
          </Td>
          <Td>
            <SimpleText isTextSecondary size="big">
              ao12
            </SimpleText>
          </Td>
        </Tr>
      </div>

      <div className="overflow-y-auto h-[calc(100%-70px)]">
        {result.map(({ position, time, ao5, ao12 }) => (
          <Tr key={position}>
            <Td>
              <NumberText
                isTextSecondary
                size="small"
              >{`${position}`}</NumberText>
            </Td>
            <Td>
              <NumberText isTextSecondary size="small">
                {time}
              </NumberText>
            </Td>
            <Td>
              <NumberText isTextSecondary size="small">
                {ao5}
              </NumberText>
            </Td>
            <Td>
              <NumberText isTextSecondary size="small">
                {ao12}
              </NumberText>
            </Td>
          </Tr>
        ))}
      </div>
    </div>
  );
}
