import { ReactNode } from "react";

type TrProps = {
  children: ReactNode;
  isThead?: boolean;
};

export default function Tr({ children, isThead = false }: TrProps) {
  return (
    <div
      className={`grid grid-cols-5 sm:grid-cols-7 ${
        isThead ? `border-b-2` : `border-0`
      } border-white`}
    >
      {children}
    </div>
  );
}
