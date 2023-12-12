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
      <SimpleText size="small">N°</SimpleText>
      <SimpleText size="small">Time</SimpleText>
      <SimpleText size="small">ao5</SimpleText>
      <SimpleText size="small">ao12</SimpleText>
    </Tr>
  );
}
