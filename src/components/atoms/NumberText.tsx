import { ColorsTheme, SizesTheme } from "@/types/theme";
import { Bebas_Neue } from "next/font/google";

type NumberTextProps = {
  children: string;
  size?: SizesTheme;
  color?: ColorsTheme;
};

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

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function NumberText({
  children,
  size = "medium",
  color = "primary",
}: NumberTextProps) {
  return (
    <span
      className={`${bebas.className} 
      ${textSizes.get(size)} 
      ${textColors.get(color)}`}
    >
      {children}
    </span>
  );
}
