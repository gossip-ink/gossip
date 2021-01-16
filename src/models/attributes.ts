import { FontFamily, FontSize, FontWeight, TextAlign, TextBaseline } from "./font";

export type TextNodeAttributes = {
  /**
   * `undefined` means inherits.
   */
  fontFamily?: FontFamily;
  /**
   * `undefined` means inherits.
   */
  fontSize?: FontSize;
  /**
   * Defaults to `"normal"`.
   */
  fontWeight?: FontWeight;
  /**
   * Defaults to `TextAlign.Left`.
   */
  align?: TextAlign;
  /**
   * Defaults to `TextBaseline.Top`.
   */
  baseline?: TextBaseline;
};

export enum Direction {
  Horizontal,
  Vertical,
}

export type GridFlowMode = {
  direction: Direction;
};

export type GridFixedMode = {
  rows: GridRowDefinition[];
  columns: GridColumnDefinition[];
};

export type GridRowDefinition = {
  width: number | "auto";
};

export type GridColumnDefinition = {
  width: number | "auto";
};
