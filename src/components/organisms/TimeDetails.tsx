import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import SimpleText from "../atoms/SimpleText";

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
        <Button handleClick={handleGoToTable} color="blue">
          <Icon name="navigate_before" style="text-white" />
        </Button>
        <div className="flex gap-4">
          <Button
            handleClick={() => markAsPlusTwo(id)}
            color={isPlusTwo ? "orange" : "green"}
          >
            <span className="my-1 mx-2">
              <SimpleText color="blue">+2</SimpleText>
            </span>
          </Button>
          <Button
            handleClick={() => markAsDNF(id)}
            color={isDNF ? "orange" : "green"}
          >
            <span className="my-1 mx-2">
              <SimpleText color="blue">DNF</SimpleText>
            </span>
          </Button>
        </div>
        <Button
          handleClick={() => {
            swiper.slidePrev();
            removeTime(id);
          }}
          color="orange"
        >
          <Icon name="delete" style="text-[#151E3F] m-1" />
        </Button>
      </div>

      <div className="flex flex-col gap-2 justify-center align-middle h-full">
        <div className="flex justify-center align-middle">
          {isPlusTwo || isDNF ? (
            <SimpleText size="big" color="orange">
              {time}
            </SimpleText>
          ) : (
            <SimpleText size="big" color="green">
              {time}
            </SimpleText>
          )}
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
          <SimpleText>{`ao5 : ${ao5}`}</SimpleText>
        </div>
        <div className="border-[1px] border-[#FFB400] rounded-2xl p-2 sm:p-4 ">
          <SimpleText>{`ao12 : ${ao12}`}</SimpleText>
        </div>
      </div>
    </div>
  );
}
