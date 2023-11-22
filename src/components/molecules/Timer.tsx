import formatTimer from "@/utils/formatTime";
import {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import NumberText from "../atoms/NumberText";

type TimerProps = {
  addTime: (time: number) => void;
  handleSwiperEnabled: (enabled: boolean) => void;
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

export default function Timer({
  addTime,
  handleSwiperEnabled,
  children,
}: TimerProps) {
  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.Stop);
  const intervalRef = useRef<NodeJS.Timeout>();
  const isTouchEventAvailable =
    typeof window !== "undefined" && "ontouchstart" in window;

  const readyTimer = useCallback(
    function () {
      handleSwiperEnabled(false);
      setTimerState(TimerState.Ready);
    },
    [handleSwiperEnabled]
  );

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
      clearInterval(intervalRef.current);
      const finishNow = Date.now();
      setNow(finishNow);
      setTimerState(TimerState.Stop);
      addTime(finishNow && startTime ? finishNow - startTime : 0);
      handleSwiperEnabled(true);
    },
    [addTime, startTime, handleSwiperEnabled]
  );

  const handleTimer = useCallback(
    function (gesture: GestureType, e?: SyntheticEvent, isMouseEvent = false) {
      if (isTouchEventAvailable && isMouseEvent) return;
      if (e) {
        const eventTarget = e.target as HTMLDivElement;
        if (
          eventTarget.parentElement &&
          eventTarget.parentElement?.id === "scrambleButton"
        )
          return;
      }
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
    [stopTimer, timerState, isTouchEventAvailable, readyTimer]
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
      onContextMenu={(e) => e.preventDefault()}
      className={`flex flex-col justify-center items-center h-full bg-gradient-to-b from-blue-600 to-blue-500
      ${
        timerState === TimerState.Ready
          ? "bg-gradient-to-b from-green-600 to-green-400"
          : "bg-gradient-to-b from-blue-600 to-blue-500"
      }`}
    >
      <NumberText size="big">
        {formatTimer(now && startTime ? now - startTime : 0)}
      </NumberText>
      {timerState === TimerState.Stop && children}
    </div>
  );
}
