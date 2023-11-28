import { ReactNode } from "react";
import SimpleText from "../atoms/SimpleText";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return (
    <div className="flex justify-center align-middle w-full h-full bg-[#030027] p-8">
      <div className="w-full h-[calc(100%-100px)] bg-[#151E3F] rounded-2xl p-4">
        <div className="flex justify-center align-middle p-4  rounded-2xl border-[1px] border-[#F6511D]">
          <SimpleText size="big">Preview 3D</SimpleText>
        </div>
        {children}
      </div>
    </div>
  );
}
