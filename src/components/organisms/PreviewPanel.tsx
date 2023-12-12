import { ReactNode } from "react";
import Icon from "../atoms/Icon";
import SimpleText from "../atoms/SimpleText";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return (
    <div className="flex justify-center align-middle w-full h-full p-8">
      <div className="w-full h-[calc(100%-60px)] bg-lightBackground rounded-2xl p-4">
        <div className="flex justify-center align-middle p-4 gap-4 rounded-2xl text-white">
          <Icon name="deployed_code" />
          <SimpleText size="big">Preview 3D</SimpleText>
        </div>
        {children}
      </div>
    </div>
  );
}
