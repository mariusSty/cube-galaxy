import { Bebas_Neue } from "next/font/google";

type NumberText = {
  children: string;
  size?: "small" | "medium" | "big";
  color?: "white" | "yellow" | "orange" | "green" | "blue";
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const colors = new Map([
  ["white", "text-[#FFFFFF]"],
  ["yellow", "text-[#FFB400]"],
  ["orange", "text-[#F6511D]"],
  ["green", "text-[#06A77D]"],
  ["blue", "text-[#151E3F]"],
]);

const sizes = new Map([
  ["small", "text-3xl"],
  ["medium", "text-5xl"],
  ["big", "text-9xl"],
]);

export default function NumberText({
  children,
  size = "medium",
  color = "white",
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
