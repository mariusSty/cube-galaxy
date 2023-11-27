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
    <div className="h-full bg-[#151E3F] rounded-2xl p-4 overflow-y-auto">
      <Tr isThead>
        <Td>
          <SimpleText>N°</SimpleText>
        </Td>
        <Td>
          <SimpleText>Time</SimpleText>
        </Td>
        <Td>
          <SimpleText>ao5</SimpleText>
        </Td>
        <Td>
          <SimpleText>ao12</SimpleText>
        </Td>
        <Td>
          <></>
        </Td>
        <Td>
          <></>
        </Td>
        <Td>
          <Button handleClick={removeAllTimes}>
            <span className="material-symbols-outlined text-white">delete</span>
          </Button>
        </Td>
      </Tr>

      <div className="">
        {result.map(({ id, position, time, ao5, ao12, isDNF, isPlusTwo }) => (
          <Tr key={id}>
            <Td>
              <SimpleText>{`${position}`}</SimpleText>
            </Td>
            <Td>
              <SimpleText>{time}</SimpleText>
            </Td>
            <Td>
              <SimpleText>{ao5}</SimpleText>
            </Td>
            <Td>
              <SimpleText>{ao12}</SimpleText>
            </Td>
            <Td>
              <Button handleClick={() => markAsPlusTwo(id)}>
                {isPlusTwo ? (
                  <SimpleText color="orange">+2</SimpleText>
                ) : (
                  <SimpleText color="green">+2</SimpleText>
                )}
              </Button>
            </Td>
            <Td>
              <Button handleClick={() => markAsDNF(id)}>
                {isDNF ? (
                  <SimpleText color="orange">DNF</SimpleText>
                ) : (
                  <SimpleText color="green">DNF</SimpleText>
                )}
              </Button>
            </Td>
            <Td>
              <Button handleClick={() => removeTime(id)}>
                <span className="material-symbols-outlined text-white">
                  close
                </span>
              </Button>
            </Td>
          </Tr>
        ))}
      </div>
    </div>
  );
}
