import { ReactNode } from "react";
import SimpleText from "../atoms/SimpleText";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return (
    <div className="flex justify-center align-middle w-full p-8">
      <div className="w-full h-[calc(100%-60px)] bg-[#151E3F] rounded-2xl p-4">
        <div className="flex justify-center align-middle p-4  gap-4 rounded-2xl border-[1px] border-[#F6511D]">
          <span className="material-symbols-outlined text-white">
            deployed_code
          </span>
          <SimpleText size="big">Preview 3D</SimpleText>
        </div>
        {children}
      </div>
    </div>
  );
}
