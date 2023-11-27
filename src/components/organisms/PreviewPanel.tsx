import { ReactNode } from "react";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return <div className="bg-[#030027] w-full h-full">{children}</div>;
}
