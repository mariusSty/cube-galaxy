type SimpleTextProps = {
  children: string;
  size?: number;
};

const sizes = new Map([
  [1, "text-sm"],
  [2, "text-md"],
  [3, "text-lg"],
  [4, "text-xl"],
  [5, "text-2xl"],
]);

export default function SimpleText({ children, size = 3 }: SimpleTextProps) {
  return <span className={`${sizes.get(size)} text-white`}>{children}</span>;
}
