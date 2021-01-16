export type FontFamily = string | string[];
export enum FontSizeMetric {
  Pixel,
  Point,
  Relative, // em
  RelativeRoot, // rem
}
export type FontSize = number | { metric: FontSizeMetric; size: number };
export type FontWeight = number | "normal" | "bold" | "light";
export enum TextAlign {
  Left,
  Center,
  Right,
}
export enum TextBaseline {
  Top,
  Middle,
  Bottom,
}
