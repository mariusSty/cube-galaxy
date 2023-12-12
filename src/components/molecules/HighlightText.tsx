import SimpleText, { Theme } from "../atoms/SimpleText";

type HighlightTextProps = {
  text: string;
  isHighlight: boolean;
  defaultColor?: Theme;
  highlightColor?: Theme;
};

export default function HighlightText({
  text,
  defaultColor = "primary",
  isHighlight,
  highlightColor = "secondary",
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
