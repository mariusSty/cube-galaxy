import formatTimer from "@/utils/formatTime";
import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import SimpleText from "../atoms/SimpleText";
import BadgeButton from "../molecules/BadgeButton";
import IconButton from "../molecules/IconButton";

type TimeDetailsPanelProps = {
  results: Result[];
  focusedId?: string;
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
};

export default function TimeDetailsPanel({
  results,
  focusedId,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
}: TimeDetailsPanelProps) {
  const swiper = useSwiper();

  function handleGoToTable() {
    swiper.slidePrev();
  }

  const resultFocused = results.find((result) => result.id === focusedId);
  if (!resultFocused) return;
  const {
    id,
    ao5,
    ao12,
    scramble,
    time,
    isDNF,
    isPlusTwo,
    isAo12DNF,
    isAo5DNF,
  } = resultFocused;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex justify-between">
        <IconButton
          iconName="navigate_before"
          iconColor="white"
          buttonColor="blue"
          handleClick={handleGoToTable}
        />
        <div className="flex gap-4">
          <BadgeButton
            text="+2"
            handleClick={() => markAsPlusTwo(id)}
            isActive={isPlusTwo}
          />
          <BadgeButton
            text="DNF"
            handleClick={() => markAsDNF(id)}
            isActive={isDNF}
          />
        </div>
        <IconButton
          iconName="delete"
          buttonColor="orange"
          iconColor="blue"
          handleClick={() => {
            swiper.slidePrev();
            removeTime(id);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center align-middle h-full">
        <div className="flex justify-center align-middle">
          <SimpleText
            size="big"
            color={isPlusTwo || isDNF ? "orange" : "green"}
          >
            {formatTimer(time, isDNF)}
          </SimpleText>
        </div>
        <div className="flex flex-wrap gap-2">
          {scramble.map((move, index) => (
            <SimpleText key={index} size="small">
              {move}
            </SimpleText>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center align-middle gap-4 sm:gap-8">
        <div className="rounded-2xl p-2 sm:p-4 ">
          <SimpleText size="big" color="yellow">
            {`ao5 : ${formatTimer(ao5, isAo5DNF)}`}
          </SimpleText>
        </div>
        <div className="rounded-2xl p-2 sm:p-4 ">
          <SimpleText size="big" color="yellow">
            {`ao12 : ${formatTimer(ao12, isAo12DNF)}`}
          </SimpleText>
        </div>
      </div>
    </div>
  );
}
