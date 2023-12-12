import { ColorsTheme, backgroundColors } from "@/types/theme";
import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  color?: ColorsTheme;
};

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
      className={`flex items-center justify-center outline-none rounded-xl pointer-events-auto ${backgroundColors.get(
        color
      )}`}
    >
      {children}
    </button>
  );
}
