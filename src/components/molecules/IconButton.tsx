import { ColorsTheme } from "@/types/theme";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

type IconButtonProps = {
  iconName: string;
  iconColor?: ColorsTheme;
  buttonColor?: ColorsTheme;
  handleClick: () => void;
};

const textColors = new Map<ColorsTheme, string>([
  ["primary", "text-primary"],
  ["secondary", "text-secondary"],
  ["danger", "text-danger"],
  ["success", "text-success"],
  ["lightBackground", "text-lightBackground"],
  ["darkBackground", "text-darkBackground"],
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
        style={`m-1 ${iconColor ? textColors.get(iconColor) : "text-primary"}`}
      />
    </Button>
  );
}
