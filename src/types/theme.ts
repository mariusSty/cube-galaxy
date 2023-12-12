export type ColorsTheme =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "lightBackground"
  | "darkBackground";

export type SizesTheme = "small" | "medium" | "big" | "veryBig";

export const textSizes = new Map<SizesTheme, string>([
  ["small", "text-md"],
  ["medium", "text-xl"],
  ["big", "text-3xl"],
  ["veryBig", "text-9xl"],
]);

export const textColors = new Map<ColorsTheme, string>([
  ["primary", "text-primary"],
  ["secondary", "text-secondary"],
  ["danger", "text-danger"],
  ["success", "text-success"],
  ["lightBackground", "text-lightBackground"],
  ["darkBackground", "text-darkBackground"],
]);

export const backgroundColors = new Map<ColorsTheme, string>([
  ["primary", "bg-primary"],
  ["secondary", "bg-secondary"],
  ["danger", "bg-danger"],
  ["success", "bg-success"],
  ["lightBackground", "bg-lightBackground"],
  ["darkBackground", "bg-darkBackground"],
]);
