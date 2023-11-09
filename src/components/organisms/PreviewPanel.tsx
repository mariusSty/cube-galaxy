import { ReactNode } from "react";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return <div className="min-h-[250px]">{children}</div>;
}
