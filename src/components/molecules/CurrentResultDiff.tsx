import formatTimer from "@/utils/formatTime";
import Icon from "../atoms/Icon";
import NumberText from "../atoms/NumberText";

type CurrentResultDiffProps = {
  value: number;
  isBetterThanPrevious: boolean;
};

export default function CurrentResultDiff({
  isBetterThanPrevious,
  value,
}: CurrentResultDiffProps) {
  return (
    <div className="flex align-middle justify-center gap-2">
      <NumberText
        size="small"
        color={isBetterThanPrevious ? "green" : "orange"}
      >
        {isBetterThanPrevious
          ? `- ${formatTimer(Math.abs(value))}`
          : `+ ${formatTimer(value)}`}
      </NumberText>
      <Icon
        name={isBetterThanPrevious ? "trending_up" : "trending_down"}
        style={`${
          isBetterThanPrevious ? "text-[#06A77D]" : "text-[#F6511D]"
        } text-3xl`}
      />
    </div>
  );
}
