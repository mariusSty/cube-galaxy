type SimpleTextProps = {
  children: string;
  isTextSecondary?: boolean;
  size?: "small" | "medium" | "big";
};

export default function SimpleText({
  children,
  size = "medium",
  isTextSecondary = false,
}: SimpleTextProps) {
  const sizes = new Map([
    ["small", "text-md"],
    ["medium", "text-xl"],
    ["big", "text-3xl"],
  ]);

  return (
    <span
      className={`${sizes.get(size)} ${
        isTextSecondary ? "text-blue-600" : "text-white"
      }`}
    >
      {children}
    </span>
  );
}
