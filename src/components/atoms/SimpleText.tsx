type SimpleTextProps = {
  children: string;
  color?: "white" | "yellow" | "orange" | "green" | "blue";
  size?: "small" | "medium" | "big";
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
}: SimpleTextProps) {
  return (
    <span className={`${sizes.get(size)} ${colors.get(color)}`}>
      {children}
    </span>
  );
}
