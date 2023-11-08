import { ReactNode } from "react";

type TdProps = {
  children: ReactNode;
};

export default function Td({ children }: TdProps) {
  return (
    <div className="flex justify-center items-center p-4 p-l8">{children}</div>
  );
}
