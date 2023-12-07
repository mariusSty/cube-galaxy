import useBreakPoints from "@/hooks/useBreakPoints";
import { Result } from "@/utils/getResult";
import { useSwiper } from "swiper/react";
import SimpleText from "../atoms/SimpleText";
import Tr from "../atoms/Tr";
import BadgeButton from "../molecules/BadgeButton";
import IconButton from "../molecules/IconButton";

type TimesTableProps = {
  results: Result[];
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
  removeTime: (id: string) => void;
  removeAllTimes: () => void;
  setTimeFocused: (id: string) => void;
};

export default function TimesTable({
  results,
  removeTime,
  removeAllTimes,
  markAsDNF,
  markAsPlusTwo,
  setTimeFocused,
}: TimesTableProps) {
  const swiper = useSwiper();
  const { isSmallScreen } = useBreakPoints();

  function handleDetails(id: string) {
    setTimeFocused(id);
    swiper.slideNext();
  }

  return (
    <div className="h-full overflow-y-auto">
      <Tr
        isThead
        renderLastItem={() => (
          <IconButton
            iconName="delete_history"
            buttonColor="orange"
            handleClick={removeAllTimes}
          />
        )}
      >
        <SimpleText>N°</SimpleText>
        <SimpleText>Time</SimpleText>
        <SimpleText>ao5</SimpleText>
        <SimpleText>ao12</SimpleText>
      </Tr>
      {results.map(({ id, position, time, ao5, ao12, isDNF, isPlusTwo }) => (
        <Tr
          key={id}
          renderLastItem={() =>
            isSmallScreen ? (
              <IconButton
                iconName="navigate_next"
                iconColor="white"
                buttonColor="blue"
                handleClick={() => handleDetails(id)}
              />
            ) : (
              <IconButton
                iconName="remove"
                iconColor="blue"
                buttonColor="orange"
                handleClick={() => removeTime(id)}
              />
            )
          }
        >
          <SimpleText>{`${position}`}</SimpleText>
          <SimpleText color={isPlusTwo || isDNF ? "orange" : "green"}>
            {time}
          </SimpleText>
          <SimpleText>{ao5}</SimpleText>
          <SimpleText>{ao12}</SimpleText>
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
        </Tr>
      ))}
    </div>
  );
}
