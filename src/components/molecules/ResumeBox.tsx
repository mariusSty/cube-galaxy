import { ReactNode } from "react";

type ResumeBoxProps = {
  children: ReactNode;
  colspan?: number;
};

export default function ResumeBox({ children, colspan }: ResumeBoxProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-5 ${
        colspan ? `col-span-${colspan}` : ""
      } rounded-lg bg-gradient-to-b from-blue-600 to-blue-500`}
    >
      {children}
    </div>
  );
}
