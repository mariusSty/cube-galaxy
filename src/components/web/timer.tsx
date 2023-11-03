import formatTimer from "@/utils/format-timer";
import { useEffect, useState } from "react";

type TimerProps = {
  addTime: () => void;
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
    const keyUpHandler = (e) => {
      if (!token) {
        if (e.keyCode === 32) {
          // Start timer
          setTimer(0);
          setTimestampStarted(Date.now());
          setIsStarted(true);
          setIsBeforeStarted(false);
        }
      }
      setToken(!token);
    };

    const keyDownHandler = (e) => {
      if (isStarted) {
        // Stop timer
        const result = Date.now() - timestampStarted;
        setTimer(result);
        setTimestampStarted(0);
        setIsStarted(false);
        addTime(result);
      } else {
        if (e.keyCode === 32) {
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
      className={`flex flex-col justify-center items-center min-h-[40%] ${
        isBeforeStarted ? "bg-green-500" : "bg-blue-600"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-6xl md:text-9xl">{formatTimer(timer)}</span>
      </div>
    </div>
  );
}
