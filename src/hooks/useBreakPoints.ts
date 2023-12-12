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
    isVerySmallScreen: isLowerThan(640),
    isSmallScreen: isGreaterThan(639) && isLowerThan(768),
    isMediumScreen: isGreaterThan(767) && isLowerThan(1024),
    isLargeScreen: isGreaterThan(1023) && isLowerThan(1280),
    isXlScreen: isGreaterThan(1279),
  };
}
