type SimpleTextProps = {
  children: string;
  color?: "white" | "yellow" | "orange" | "green" | "blue";
  size?: "small" | "medium" | "big";
  bold?: boolean;
  underline?: boolean;
};

const sizes = new Map([
  ["small", "text-sm"],
  ["medium", "text-md"],
  ["big", "text-xl"],
]);

const colors = new Map([
  ["white", "text-[#FFFFFF]"],
  ["yellow", "text-[#FFB400]"],
  ["orange", "text-[#F6511D]"],
  ["green", "text-[#06A77D]"],
  ["blue", "text-[#151E3F]"],
]);

export default function SimpleText({
  children,
  size = "medium",
  color = "white",
  underline = false,
}: SimpleTextProps) {
  return (
    <span
      className={`
      ${sizes.get(size)} 
      ${colors.get(color)} 
      ${underline ? "underline underline-offset-8" : ""}`}
    >
      {children}
    </span>
  );
}
