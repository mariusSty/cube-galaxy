import formatTimer from "@/utils/formatTime";
import { useEffect, useState } from "react";
import NumberText from "../atoms/NumberText";

type TimerProps = {
  addTime: (time: number) => void;
};

export default function Timer({ addTime }: TimerProps) {
  const [timer, setTimer] = useState(0);
  const [timestampStarted, setTimestampStarted] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isBeforeStarted, setIsBeforeStarted] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted) {
      interval = setInterval(() => {
        setTimer(Date.now() - timestampStarted);
      }, 12);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStarted, timestampStarted]);

  useEffect(() => {
    const keyUpHandler = (e: KeyboardEvent) => {
      if (!token) {
        if (e.code === "Space") {
          // Start timer
          setTimer(0);
          setTimestampStarted(Date.now());
          setIsStarted(true);
          setIsBeforeStarted(false);
        }
      }
      setToken(!token);
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (isStarted) {
        // Stop timer
        const result = Date.now() - timestampStarted;
        setTimer(result);
        setTimestampStarted(0);
        setIsStarted(false);
        addTime(result);
      } else {
        if (e.code === "Space") {
          setIsBeforeStarted(true);
        }
      }
    };

    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keyup", keyUpHandler);
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isStarted, timestampStarted, token, addTime]);

  return (
    <div
      className={`flex justify-center items-center min-h-[400px] md:h-[60%] ${
        isBeforeStarted
          ? "bg-gradient-to-b from-green-600 to-green-400"
          : "bg-gradient-to-b from-blue-600 to-blue-500"
      }`}
    >
      <NumberText size="big">{formatTimer(timer)}</NumberText>
    </div>
  );
}
