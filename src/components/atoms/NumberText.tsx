import { Bebas_Neue } from "next/font/google";
import { Theme, colors } from "./SimpleText";

type NumberText = {
  children: string;
  size?: "small" | "medium" | "big";
  color?: Theme;
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const sizes = new Map([
  ["small", "text-3xl"],
  ["medium", "text-5xl"],
  ["big", "text-9xl"],
]);

export default function NumberText({
  children,
  size = "medium",
  color = "primary",
}: NumberText) {
  return (
    <span
      className={`${bebas.className} 
      ${sizes.get(size)} 
      ${colors.get(color)}`}
    >
      {children}
    </span>
  );
}
