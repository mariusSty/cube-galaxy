import formatTimer from "@/utils/formatTime";
import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import SimpleText from "../atoms/SimpleText";
import AverageOf from "../molecules/AverageOf";
import BadgeButton from "../molecules/BadgeButton";
import IconButton from "../molecules/IconButton";
import Scramble from "../molecules/Scramble";

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
  const { id, scramble, time, isDNF, isPlusTwo } = resultFocused;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex justify-between">
        <IconButton
          iconName="navigate_before"
          iconColor="primary"
          buttonColor="lightBackground"
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
          buttonColor="danger"
          iconColor="lightBackground"
          handleClick={() => {
            swiper.slidePrev();
            removeTime(id);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center align-middle h-full">
        <div className="flex justify-center align-middle">
          <SimpleText color={isPlusTwo || isDNF ? "danger" : "success"}>
            {formatTimer(time, isDNF)}
          </SimpleText>
        </div>
        <Scramble scramble={scramble} />
      </div>

      <AverageOf currentResult={resultFocused} />
    </div>
  );
}
