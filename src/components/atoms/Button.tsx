import { MouseEvent, ReactNode } from "react";
import { Theme, backgroundColors } from "./SimpleText";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  color?: Theme;
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
