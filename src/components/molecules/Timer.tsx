import formatTimer from "@/utils/formatTime";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import NumberText from "../atoms/NumberText";

type TimerProps = {
  addTime: (time: number) => void;
  children?: ReactNode;
};

enum TimerState {
  Ready = "READY",
  Start = "START",
  Stop = "STOP",
}

enum GestureType {
  Up = "UP",
  Down = "DOWN",
}

export default function Timer({ addTime, children }: TimerProps) {
  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.Stop);
  const intervalRef = useRef<NodeJS.Timeout>();
  const isTouchEventAvailable =
    typeof window !== "undefined" && "ontouchstart" in window;

  function readyTimer() {
    setTimerState(TimerState.Ready);
  }

  function startTimer() {
    setNow(Date.now());
    setStartTime(Date.now());
    setTimerState(TimerState.Start);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  const stopTimer = useCallback(
    function () {
      setNow(Date.now());
      setTimerState(TimerState.Stop);
      clearInterval(intervalRef.current);
      addTime(now && startTime ? now - startTime : 0);
    },
    [addTime, now, startTime]
  );

  const handleTimer = useCallback(
    function (gesture: GestureType, isMouseEvent = false) {
      if (isTouchEventAvailable && isMouseEvent) return;
      if (typeof TouchEvent !== undefined)
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
    [stopTimer, timerState, isTouchEventAvailable]
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
      onTouchStart={() => handleTimer(GestureType.Down)}
      onTouchEnd={() => handleTimer(GestureType.Up)}
      onMouseDown={() => handleTimer(GestureType.Down, true)}
      onMouseUp={() => handleTimer(GestureType.Up, true)}
      onContextMenu={(e) => e.preventDefault()}
      className={`flex flex-col justify-center items-center min-h-[400px] bg-gradient-to-b from-blue-600 to-blue-500
      ${
        timerState === TimerState.Ready
          ? "bg-gradient-to-b from-green-600 to-green-400"
          : "bg-gradient-to-b from-blue-600 to-blue-500"
      }
      ${
        timerState === TimerState.Ready || timerState === TimerState.Start
          ? "fixed top-0 h-screen w-screen z-10 overflow-hidden"
          : "lg:h-[60%] "
      }`}
    >
      <NumberText size="big">
        {formatTimer(now && startTime ? now - startTime : 0)}
      </NumberText>
      {timerState === TimerState.Start ?? children}
    </div>
  );
}
