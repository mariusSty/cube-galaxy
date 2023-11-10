import { ReactNode } from "react";

type TrProps = {
  children: ReactNode;
  isThead?: boolean;
};

export default function Tr({ children, isThead = false }: TrProps) {
  return (
    <div
      className={`grid grid-cols-6 bg-white ${
        isThead ? `border-b-2` : `border-b-[1px]`
      } border-blue-600`}
    >
      {children}
    </div>
  );
}
