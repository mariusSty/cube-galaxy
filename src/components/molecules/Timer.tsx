import { TimerState } from "@/types/timer";
import { SyntheticEvent, useCallback, useEffect } from "react";

type TimerProps = {
  readyTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  liberateTimer: () => void;
  timerState: TimerState;
  renderTimerDigit: () => JSX.Element;
};

enum GestureType {
  Up = "UP",
  Down = "DOWN",
}

export default function Timer({
  readyTimer,
  startTimer,
  stopTimer,
  liberateTimer,
  timerState,
  renderTimerDigit,
}: TimerProps) {
  const isTouchEventAvailable =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleTimer = useCallback(
    function (
      gesture: GestureType,
      e: SyntheticEvent | KeyboardEvent,
      isMouseEvent = false
    ) {
      if (isTouchEventAvailable && isMouseEvent) return;

      if (isMouseEvent || gesture === GestureType.Up) {
        e.preventDefault();
      }

      if (timerState === TimerState.Stop && gesture === GestureType.Down) {
        readyTimer();
      } else if (
        timerState === TimerState.Ready &&
        gesture === GestureType.Up
      ) {
        startTimer();
      } else if (
        timerState === TimerState.Start &&
        gesture === GestureType.Down
      ) {
        stopTimer();
      } else if (
        timerState === TimerState.Stopping &&
        gesture === GestureType.Up
      ) {
        liberateTimer();
      } else {
        return;
      }
    },
    [
      stopTimer,
      timerState,
      isTouchEventAvailable,
      readyTimer,
      startTimer,
      liberateTimer,
    ]
  );

  useEffect(() => {
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleTimer(GestureType.Up, e);
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleTimer(GestureType.Down, e);
      }
    };

    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keyup", keyUpHandler);
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleTimer]);

  return (
    <div
      onTouchStart={(e) => handleTimer(GestureType.Down, e)}
      onTouchEnd={(e) => handleTimer(GestureType.Up, e)}
      onMouseDown={(e) => handleTimer(GestureType.Down, e, true)}
      onMouseUp={(e) => handleTimer(GestureType.Up, e, true)}
      className={`flex flex-col justify-center items-center h-full cursor-pointer gap-2 p-8 
      ${
        timerState === TimerState.Stop
          ? "hover:brightness-110 transition-all duration-300"
          : ""
      }
      ${
        timerState !== TimerState.Stop
          ? "absolute w-full top-0 right-0 z-10"
          : "md:rounded-2xl"
      }
      ${timerState === TimerState.Ready ? "bg-success" : "bg-lightBackground"}`}
    >
      {renderTimerDigit()}
    </div>
  );
}
