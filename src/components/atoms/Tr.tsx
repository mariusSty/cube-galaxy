import { ReactNode } from "react";

type TrProps = {
  children: ReactNode;
  border?: number;
};

export default function Tr({ children, border = 1 }: TrProps) {
  return (
    <div
      className={`grid grid-cols-4 border-b-[${border.toString()}px] border-blue-600`}
    >
      {children}
    </div>
  );
}
