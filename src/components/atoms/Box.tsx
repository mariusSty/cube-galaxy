import { ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
};

export default function Box({ children }: BoxProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 md:p-1 lg:p-2 rounded-2xl bg-lightBackground`}
    >
      {children}
    </div>
  );
}
