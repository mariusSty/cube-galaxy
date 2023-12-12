import { ColorsTheme, SizesTheme } from "@/types/theme";

const textSizes = new Map<SizesTheme, string>([
  ["small", "text-md"],
  ["medium", "text-xl"],
  ["big", "text-3xl"],
  ["veryBig", "text-9xl"],
]);

const textColors = new Map<ColorsTheme, string>([
  ["primary", "text-primary"],
  ["secondary", "text-secondary"],
  ["danger", "text-danger"],
  ["success", "text-success"],
  ["lightBackground", "text-lightBackground"],
  ["darkBackground", "text-darkBackground"],
]);

type SimpleTextProps = {
  children: string;
  color?: ColorsTheme;
  size?: SizesTheme;
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
