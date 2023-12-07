import { useEffect, useState } from "react";

export default function useBreakPoints() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resize = () => {
    setWindowWidth(window.innerWidth);
  };

  const isGreaterThan = (value: number) => value < windowWidth;

  const isLowerThan = (value: number) => value > windowWidth;

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return {
    windowWidth,
    isGreaterThan,
    isLowerThan,
    isSmallScreen: isLowerThan(641),
  };
}
