import { Result } from "@/types/timer";
import formatTimer from "@/utils/formatTime";
import SimpleText from "../atoms/SimpleText";
import Tr from "../atoms/Tr";
import BadgeButton from "../molecules/BadgeButton";
import HighlightText from "../molecules/HighlightText";
import IconButton from "../molecules/IconButton";

type TimeRowProps = {
  result: Result;
  bestTime: number;
  bestAo5: number | null;
  bestAo12: number | null;
  handleDetails: (id: string) => void;
  markAsDNF: (id: string) => void;
  markAsPlusTwo: (id: string) => void;
};

export default function TimeRow({
  result,
  bestTime,
  bestAo5,
  bestAo12,
  handleDetails,
  markAsDNF,
  markAsPlusTwo,
}: TimeRowProps) {
  const {
    id,
    position,
    time,
    ao5,
    ao12,
    isDNF,
    isPlusTwo,
    isAo5DNF,
    isAo12DNF,
  } = result;

  const isBestTime = isDNF === false && bestTime === time;
  const isBestAo5 = ao5 != null && isDNF === false && bestAo5 === ao5;
  const isBestAo12 = ao12 != null && isDNF === false && bestAo12 === ao12;

  return (
    <Tr
      key={id}
      renderLastItem={() => (
        <IconButton
          iconName="navigate_next"
          iconColor="primary"
          buttonColor="lightBackground"
          handleClick={() => handleDetails(id)}
        />
      )}
    >
      <SimpleText size="small">{`${position}`}</SimpleText>
      <HighlightText
        isHighlight={isBestTime}
        text={formatTimer(time, isDNF)}
        defaultColor={isPlusTwo || isDNF ? "danger" : "success"}
      />
      <HighlightText
        isHighlight={isBestAo5}
        text={formatTimer(ao5, isAo5DNF)}
      />
      <HighlightText
        isHighlight={isBestAo12}
        text={formatTimer(ao12, isAo12DNF)}
      />
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
  );
}
