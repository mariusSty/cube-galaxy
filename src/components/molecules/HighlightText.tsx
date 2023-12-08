import SimpleText from "../atoms/SimpleText";

type HighlightTextProps = {
  text: string;
  isHighlight: boolean;
  defaultColor?: "white" | "yellow" | "orange" | "green" | "blue";
  highlightColor?: "white" | "yellow" | "orange" | "green" | "blue";
};

export default function HighlightText({
  text,
  defaultColor = "white",
  isHighlight,
  highlightColor = "yellow",
}: HighlightTextProps) {
  return (
    <SimpleText
      color={isHighlight ? highlightColor : defaultColor}
      underline={isHighlight}
    >
      {text}
    </SimpleText>
  );
}
