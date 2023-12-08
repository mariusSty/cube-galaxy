import { MouseEvent } from "react";

type CloseToastButtonProps = {
  closeToast: (e: MouseEvent<HTMLElement>) => void;
};

export default function CloseToastButton({
  closeToast,
}: CloseToastButtonProps) {
  return (
    <span className="material-symbols-outlined text-white" onClick={closeToast}>
      close
    </span>
  );
}
