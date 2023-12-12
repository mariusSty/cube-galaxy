import useBreakPoints from "@/hooks/useBreakPoints";
import { ReactNode } from "react";
import Td from "./Td";

type TrProps = {
  isThead?: boolean;
  children: ReactNode[];
  renderLastItem?: () => JSX.Element;
};

export default function Tr({
  isThead = false,
  children = [],
  renderLastItem,
}: TrProps) {
  const { isVerySmallScreen, isMediumScreen, isLargeScreen } = useBreakPoints();

  let contentToDisplay, gridClass, lastTdClass;
  if (isVerySmallScreen) {
    contentToDisplay = children.slice(0, 4);
    gridClass = "grid-cols-5";
    lastTdClass = "col-start-5";
  } else if (isMediumScreen) {
    contentToDisplay = children.slice(0, 2);
    gridClass = "grid-cols-3";
    lastTdClass = "col-start-3";
  } else if (isLargeScreen) {
    contentToDisplay = children.slice(0, 4);
    gridClass = "grid-cols-5";
    lastTdClass = "col-start-5";
  } else {
    contentToDisplay = children.slice();
    gridClass = "grid-cols-7";
    lastTdClass = "col-start-7";
  }

  const content = contentToDisplay.map((td, i) => <Td key={i}>{td}</Td>);

  return (
    <div
      className={`grid ${gridClass} 
      ${isThead ? `border-b-2 border-white` : `border-0`}`}
    >
      {content}
      {renderLastItem && <Td style={lastTdClass}>{renderLastItem()}</Td>}
    </div>
  );
}
