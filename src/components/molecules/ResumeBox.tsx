import { ReactNode } from "react";

type ResumeBoxProps = {
  children: ReactNode;
  isColspan?: boolean;
};

export default function ResumeBox({ children, isColspan }: ResumeBoxProps) {
  const colspan = isColspan ? "col-span-3" : "col-span-1";
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 p-4 ${colspan} rounded-2xl bg-[#151E3F]`}
    >
      {children}
    </div>
  );
}
