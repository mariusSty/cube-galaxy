import formatTimer from "@/utils/formatTime";
import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import SimpleText from "../atoms/SimpleText";
import BadgeButton from "../molecules/BadgeButton";
import IconButton from "../molecules/IconButton";

type TimeDetailsProps = {
  results: Result[];
  focusedId?: string;
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
};

export default function TimeDetails({
  results,
  focusedId,
  markAsDNF,
  markAsPlusTwo,
  removeTime,
}: TimeDetailsProps) {
  const swiper = useSwiper();

  function handleGoToTable() {
    swiper.slidePrev();
  }

  const resultFocused = results.find((result) => result.id === focusedId);
  if (!resultFocused) return;
  const { id, ao5, ao12, scramble, time, isDNF, isPlusTwo } = resultFocused;

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
            {formatTimer(time)}
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
        <div className="border-[1px] border-[#FFB400] rounded-2xl p-2 sm:p-4 ">
          <SimpleText>{`ao5 : ${formatTimer(ao5)}`}</SimpleText>
        </div>
        <div className="border-[1px] border-[#FFB400] rounded-2xl p-2 sm:p-4 ">
          <SimpleText>{`ao12 : ${formatTimer(ao12)}`}</SimpleText>
        </div>
      </div>
    </div>
  );
}
