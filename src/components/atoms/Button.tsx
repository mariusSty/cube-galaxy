import { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
};

export default function Button({ handleClick, children }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center text-xl text-blue-600 hover:text-blue-400 outline-none"
    >
      {children}
    </button>
  );
}
