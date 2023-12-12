import { ColorsTheme, SizesTheme, textColors, textSizes } from "@/types/theme";
import { Bebas_Neue } from "next/font/google";

type NumberText = {
  children: string;
  size?: SizesTheme;
  color?: ColorsTheme;
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function NumberText({
  children,
  size = "medium",
  color = "primary",
}: NumberText) {
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
