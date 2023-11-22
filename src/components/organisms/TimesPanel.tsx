import { Time } from "@/hooks/useTimes";
import formatTimer from "@/utils/formatTime";
import { getAverageOf } from "@/utils/getResult";
import Button from "../atoms/Button";
import SimpleText from "../atoms/SimpleText";
import Td from "../atoms/Td";
import Tr from "../atoms/Tr";

type TimesPanelProps = {
  times: Time[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
};

export default function TimesPanel({
  times,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
  removeAllTimes,
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
        isPlusTwo: time.isPlusTwo,
      };
    });

  return (
    <div className="row-start-3 lg:row-start-2 xl:row-start-1 h-full max-h-[40vh] p-4">
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
        <Td>
          <></>
        </Td>
        <Td>
          <></>
        </Td>
        <Td>
          <Button handleClick={removeAllTimes}>
            <span className="material-symbols-outlined">close</span>
          </Button>
        </Td>
      </Tr>

      <div className="overflow-y-auto h-[calc(100%-70px)]">
        {result.map(({ id, position, time, ao5, ao12, isDNF, isPlusTwo }) => (
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
              <Button handleClick={() => markAsPlusTwo(id)}>
                {isPlusTwo ? "OK" : "+2"}
              </Button>
            </Td>
            <Td>
              <Button handleClick={() => markAsDNF(id)}>
                {isDNF ? "OK" : "DNF"}
              </Button>
            </Td>
            <Td>
              <Button handleClick={() => removeTime(id)}>
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Td>
          </Tr>
        ))}
      </div>
    </div>
  );
}
