import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
  color?: "white" | "yellow" | "orange" | "green" | "blue";
};

const colors = new Map([
  ["white", "bg-[#FFFFFF]"],
  ["yellow", "bg-[#FFB400]"],
  ["orange", "bg-[#F6511D]"],
  ["green", "bg-[#06A77D]"],
  ["blue", "bg-[#151E3F]"],
]);

export default function Button({
  handleClick,
  children,
  color = "yellow",
}: ButtonProps) {
  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`flex items-center justify-center outline-none rounded-xl pointer-events-auto ${colors.get(
        color
      )}`}
    >
      {children}
    </button>
  );
}
