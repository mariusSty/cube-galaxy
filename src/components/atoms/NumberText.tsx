import { Bebas_Neue } from "next/font/google";

type NumberText = {
  children: string;
  isTextSecondary?: boolean;
  size?: "small" | "medium" | "big";
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function NumberText({
  children,
  isTextSecondary = false,
  size = "medium",
}: NumberText) {
  const sizes = new Map([
    ["small", "text-3xl"],
    ["medium", "text-5xl"],
    ["big", "text-9xl"],
  ]);

  return (
    <span
      className={`${bebas.className} ${sizes.get(size)} ${
        isTextSecondary ? "text-blue-600" : "text-white"
      }`}
    >
      {children}
    </span>
  );
}
