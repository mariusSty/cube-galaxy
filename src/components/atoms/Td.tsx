import { ReactNode } from "react";

type TdProps = {
  children: ReactNode;
  style?: string;
};

export default function Td({ children, style }: TdProps) {
  return (
    <div className={`flex justify-center items-center p-4 ${style}`}>
      {children}
    </div>
  );
}
