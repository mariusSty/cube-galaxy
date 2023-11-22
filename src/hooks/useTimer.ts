import formatTimer from "@/utils/formatTime";
import { useCallback, useRef, useState } from "react";

export enum TimerState {
  Ready = "READY",
  Start = "START",
  Stop = "STOP",
}

type UseTimerProps = {
  handleReady?: (params?: any) => void;
  handleStart?: (params?: any) => void;
  handleStop?: (params?: any) => void;
};

export default function useTimer({
  handleReady,
  handleStart,
  handleStop,
}: UseTimerProps) {
  const [now, setNow] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.Stop);
  const intervalRef = useRef<NodeJS.Timeout>();

  const readyTimer = useCallback(
    function () {
      setTimerState(TimerState.Ready);
      handleReady && handleReady();
    },
    [handleReady]
  );

  const startTimer = useCallback(
    function () {
      setNow(Date.now());
      setStartTime(Date.now());
      setTimerState(TimerState.Start);
      handleStart && handleStart();

      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 10);
    },
    [handleStart]
  );

  const stopTimer = useCallback(
    function () {
      clearInterval(intervalRef.current);
      const finishNow = Date.now();
      setNow(finishNow);
      setTimerState(TimerState.Stop);
      handleStop &&
        handleStop(finishNow && startTime ? finishNow - startTime : 0);
    },
    [handleStop, startTime]
  );

  return {
    currentResult: formatTimer(now && startTime ? now - startTime : 0),
    timerState,
    readyTimer,
    startTimer,
    stopTimer,
  };
}
