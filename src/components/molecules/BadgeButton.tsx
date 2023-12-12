import Button from "../atoms/Button";
import SimpleText from "../atoms/SimpleText";

type BadgeButtonProps = {
  text: string;
  isActive: boolean;
  handleClick: () => void;
};

export default function BadgeButton({
  handleClick,
  isActive,
  text,
}: BadgeButtonProps) {
  return (
    <Button handleClick={handleClick} color={isActive ? "danger" : "success"}>
      <span className="my-1 mx-2">
        <SimpleText color="lightBackground">{text}</SimpleText>
      </span>
    </Button>
  );
}
