import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

type IconButtonProps = {
  iconName: string;
  iconColor?: "white" | "yellow" | "orange" | "green" | "blue";
  buttonColor?: "white" | "yellow" | "orange" | "green" | "blue";
  handleClick: () => void;
};
const colors = new Map([
  ["white", "text-[#FFFFFF]"],
  ["yellow", "text-[#FFB400]"],
  ["orange", "text-[#F6511D]"],
  ["green", "text-[#06A77D]"],
  ["blue", "text-[#151E3F]"],
]);

export default function IconButton({
  iconName,
  iconColor,
  buttonColor,
  handleClick,
}: IconButtonProps) {
  return (
    <Button handleClick={handleClick} color={buttonColor}>
      <Icon
        name={iconName}
        style={`m-1 ${iconColor ? colors.get(iconColor) : "text-white"}`}
      />
    </Button>
  );
}
