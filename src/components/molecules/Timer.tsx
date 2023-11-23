import { TimerState } from "@/hooks/useTimer";
import { SyntheticEvent, useCallback, useEffect } from "react";
import NumberText from "../atoms/NumberText";

type TimerProps = {
  readyTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  timerState: TimerState;
  currentResult: string;
};

enum GestureType {
  Up = "UP",
  Down = "DOWN",
}

export default function Timer({
  readyTimer,
  startTimer,
  stopTimer,
  timerState,
  currentResult,
}: TimerProps) {
  const isTouchEventAvailable =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleTimer = useCallback(
    function (gesture: GestureType, e?: SyntheticEvent, isMouseEvent = false) {
      console.log("clic", gesture, isMouseEvent, e);
      if (isTouchEventAvailable && isMouseEvent) return;
      if (e) {
        const eventTarget = e.target as HTMLDivElement;
        if (eventTarget.parentElement?.id === "scrambleButton") return;
      }
      if (typeof TouchEvent === undefined) return;

      if (timerState === TimerState.Stop) {
        if (gesture === GestureType.Up) return;
        readyTimer();
      } else if (timerState === TimerState.Ready) {
        if (gesture === GestureType.Down) return;
        startTimer();
      } else {
        if (gesture === GestureType.Down) return;
        stopTimer();
      }
    },
    [stopTimer, timerState, isTouchEventAvailable, readyTimer, startTimer]
  );

  useEffect(() => {
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleTimer(GestureType.Up);
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleTimer(GestureType.Down);
      }
    };

    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keyup", keyUpHandler);
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleTimer, timerState]);

  return (
    <div
      onTouchStart={(e) => handleTimer(GestureType.Down, e)}
      onTouchEnd={(e) => handleTimer(GestureType.Up, e)}
      onMouseDown={(e) => handleTimer(GestureType.Down, e, true)}
      onMouseUp={(e) => handleTimer(GestureType.Up, e, true)}
      className={`flex flex-col justify-center items-center h-full bg-gradient-to-b from-blue-600 to-blue-500
      ${
        timerState === TimerState.Ready
          ? "bg-gradient-to-b from-green-600 to-green-400"
          : "bg-gradient-to-b from-blue-600 to-blue-500"
      }`}
    >
      <NumberText size="big">{currentResult}</NumberText>
    </div>
  );
}
