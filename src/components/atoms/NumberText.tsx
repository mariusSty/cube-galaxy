import { Bebas_Neue } from "next/font/google";

type NumberText = {
  children: string;
  size?: number;
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const sizes = new Map([
  [1, "text-sm"],
  [2, "text-md"],
  [3, "text-lg"],
  [4, "text-xl"],
  [5, "text-2xl"],
  [6, "text-3xl"],
  [7, "text-4xl"],
]);

export default function NumberText({ children, size = 5 }: NumberText) {
  return (
    <span className={`${bebas.className} ${sizes.get(size)} text-white`}>
      {children}
    </span>
  );
}
