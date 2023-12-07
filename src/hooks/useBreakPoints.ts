import { useEffect, useState } from "react";

export default function useBreakPoints() {
  const [windowWidth, setWindowWidth] = useState<number>(Infinity);

  const resize = () => {
    setWindowWidth(window.innerWidth);
  };

  const isGreaterThan = (value: number) => value < windowWidth;

  const isLowerThan = (value: number) => value > windowWidth;

  useEffect(() => {
    if (windowWidth === Infinity) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [windowWidth]);

  return {
    windowWidth,
    isGreaterThan,
    isLowerThan,
    isSmallScreen: isLowerThan(641),
  };
}
