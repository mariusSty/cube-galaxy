import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import { Theme, colors } from "../atoms/SimpleText";

type IconButtonProps = {
  iconName: string;
  iconColor?: Theme;
  buttonColor?: Theme;
  handleClick: () => void;
};

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
        style={`m-1 ${iconColor ? colors.get(iconColor) : "text-primary"}`}
      />
    </Button>
  );
}
