import formatTimer from "@/utils/formatTime";
import { useCallback, useEffect, useRef, useState } from "react";

export enum TimerState {
  Ready = "READY",
  Start = "START",
  Stopping = "STOPPING",
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
  const intervalRef = useRef<number>();

  const readyTimer = useCallback(
    function () {
      setTimerState(TimerState.Ready);
      setStartTime(null);
      handleReady && handleReady();
    },
    [handleReady]
  );

  const startTimer = useCallback(
    function () {
      const startNow = Date.now();
      setStartTime(startNow);
      setNow(startNow);
      setTimerState(TimerState.Start);
      handleStart && handleStart();
    },
    [handleStart]
  );

  const stopTimer = useCallback(
    function () {
      const finishNow = Date.now();
      setNow(finishNow);
      setTimerState(TimerState.Stopping);
      handleStop &&
        handleStop(finishNow && startTime ? finishNow - startTime : 0);
    },
    [handleStop, startTime]
  );

  const liberateTimer = useCallback(function () {
    setTimerState(TimerState.Stop);
  }, []);

  const runTimer = useCallback(() => {
    setNow(Date.now());
    intervalRef.current = requestAnimationFrame(runTimer);
  }, []);

  useEffect(() => {
    if (timerState === TimerState.Start) {
      intervalRef.current = requestAnimationFrame(runTimer);
    }

    if (timerState === TimerState.Stopping && intervalRef.current) {
      cancelAnimationFrame(intervalRef.current);
    }
  }, [timerState, runTimer]);

  return {
    timerValue: formatTimer(now && startTime ? now - startTime : 0),
    timerState,
    readyTimer,
    startTimer,
    liberateTimer,
    stopTimer,
  };
}
