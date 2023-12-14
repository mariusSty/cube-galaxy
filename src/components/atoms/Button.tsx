import { ColorsTheme } from "@/types/theme";
import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  color?: ColorsTheme;
};

const backgroundColors = new Map<ColorsTheme, string>([
  ["primary", "bg-primary"],
  ["secondary", "bg-secondary"],
  ["danger", "bg-danger"],
  ["success", "bg-success"],
  ["lightBackground", "bg-lightBackground"],
  ["darkBackground", "bg-darkBackground"],
]);

export default function Button({
  handleClick,
  children,
  color = "secondary",
}: ButtonProps) {
  function handleButtonClick(e: MouseEvent) {
    e.preventDefault();
    handleClick();
  }

  return (
    <button
      onClick={handleButtonClick}
      className={`flex items-center justify-center outline-none rounded-xl pointer-events-auto hover:opacity-75 transition-all duration-300
       ${backgroundColors.get(color)}`}
    >
      {children}
    </button>
  );
}
