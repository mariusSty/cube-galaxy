import useBreakPoints from "@/hooks/usBreakPoints";
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
  const { isSmallScreen } = useBreakPoints();

  const contentToDisplay = isSmallScreen
    ? children.slice(0, 4)
    : children.slice();
  const content = contentToDisplay.map((td, i) => <Td key={i}>{td}</Td>);

  return (
    <div
      className={`grid ${isSmallScreen ? "grid-cols-5" : "grid-cols-7"} 
      ${isThead ? `border-b-2 border-white` : `border-0`}`}
    >
      {content}
      {renderLastItem && (
        <Td style={isSmallScreen ? "col-start-5" : "col-start-7"}>
          {renderLastItem()}
        </Td>
      )}
    </div>
  );
}
