import { ReactNode } from "react";

type ResumeBoxProps = {
  children: ReactNode;
  isColspan?: boolean;
};

export default function ResumeBox({ children, isColspan }: ResumeBoxProps) {
  const colspan = isColspan ? "col-span-3" : "col-span-1";
  return (
    <div
      className={`flex flex-col justify-center items-center gap-5 p-4 ${colspan} rounded-lg bg-gradient-to-b from-blue-600 to-blue-500`}
    >
      {children}
    </div>
  );
}
