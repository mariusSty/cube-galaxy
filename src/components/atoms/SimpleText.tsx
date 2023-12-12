export type Theme =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "lightBackground"
  | "darkBackground";

type SimpleTextProps = {
  children: string;
  color?: Theme;
  size?: "small" | "medium" | "big";
  bold?: boolean;
  underline?: boolean;
};

const sizes = new Map([
  ["small", "text-sm"],
  ["medium", "text-md"],
  ["big", "text-xl"],
]);

export const colors = new Map([
  ["primary", "text-primary"],
  ["secondary", "text-secondary"],
  ["danger", "text-danger"],
  ["success", "text-success"],
  ["lightBackground", "text-lightBackground"],
  ["darkBackground", "text-darkBackground"],
]);

export const backgroundColors = new Map([
  ["primary", "bg-primary"],
  ["secondary", "bg-secondary"],
  ["danger", "bg-danger"],
  ["success", "bg-success"],
  ["lightBackground", "bg-lightBackground"],
  ["darkBackground", "bg-darkBackground"],
]);

export default function SimpleText({
  children,
  size = "medium",
  color = "primary",
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
