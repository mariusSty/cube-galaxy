import { ReactNode } from "react";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return <div className="h-full">{children}</div>;
}
