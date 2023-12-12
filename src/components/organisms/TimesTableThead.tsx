import SimpleText from "../atoms/SimpleText";
import Tr from "../atoms/Tr";
import IconButton from "../molecules/IconButton";

type TimesTableTheadProps = {
  removeAllTimes: () => void;
};

export default function TimesTableThead({
  removeAllTimes,
}: TimesTableTheadProps) {
  return (
    <Tr
      isThead
      renderLastItem={() => (
        <IconButton
          iconColor="lightBackground"
          iconName="delete"
          buttonColor="danger"
          handleClick={removeAllTimes}
        />
      )}
    >
      <SimpleText>N°</SimpleText>
      <SimpleText>Time</SimpleText>
      <SimpleText>ao5</SimpleText>
      <SimpleText>ao12</SimpleText>
    </Tr>
  );
}
