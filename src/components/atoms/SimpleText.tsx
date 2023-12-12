import { ColorsTheme, textColors, textSizes } from "@/types/theme";

type SimpleTextProps = {
  children: string;
  color?: ColorsTheme;
  size?: "small" | "medium" | "big";
  bold?: boolean;
  underline?: boolean;
};

export default function SimpleText({
  children,
  size = "medium",
  color = "primary",
  underline = false,
}: SimpleTextProps) {
  return (
    <span
      className={`
      ${textSizes.get(size)} 
      ${textColors.get(color)} 
      ${underline ? "underline underline-offset-8" : ""}`}
    >
      {children}
    </span>
  );
}
