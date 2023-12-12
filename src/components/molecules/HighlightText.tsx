import { ColorsTheme } from "@/types/theme";
import SimpleText from "../atoms/SimpleText";

type HighlightTextProps = {
  text: string;
  isHighlight: boolean;
  defaultColor?: ColorsTheme;
  highlightColor?: ColorsTheme;
};

export default function HighlightText({
  text,
  defaultColor = "primary",
  isHighlight,
  highlightColor = "secondary",
}: HighlightTextProps) {
  return (
    <SimpleText
      size="small"
      color={isHighlight ? highlightColor : defaultColor}
      underline={isHighlight}
    >
      {text}
    </SimpleText>
  );
}
