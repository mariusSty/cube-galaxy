import { ReactNode } from "react";

type PreviewPanelProps = {
  children: ReactNode;
};

export default function PreviewPanel({ children }: PreviewPanelProps) {
  return (
    <div className="min-h-[300px] col-span-1 lg:col-span-2 xl:col-span-1">
      {children}
    </div>
  );
}
