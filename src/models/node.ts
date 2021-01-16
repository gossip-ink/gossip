import { TextNodeAttributes } from "./attributes";

export enum NodeType {
  Text,
  Image,
  Chart,
  RichText,
  Table,
  Code,
  Markdown,
  Page,
  Grid,
}

type NodeBase = {
  readonly id: string;
};

type ContainerBase = NodeBase & {
  children: Node[];
};

export type TextNode = NodeBase & {
  type: NodeType.Text;
  text: string;
  attributes?: TextNodeAttributes;
};

export type ImageNode = NodeBase & {
  type: NodeType.Image;
  url: string;
  alternativeText?: string;
};

export type ChartNode = NodeBase & {
  type: NodeType.Chart;
  tableUrl: string;
  chartSpec: unknown;
};

export type RichTextNode = NodeBase & {
  type: NodeType.RichText;
  html: string;
};

export type TableNode = NodeBase & {
  type: NodeType.Table;
  rows: string[][];
};

export type CodeNode = NodeBase & {
  type: NodeType.Code;
  language: string;
  source: string;
};

export type MarkdownNode = NodeBase & {
  type: NodeType.Markdown;
  source: string;
  options: unknown;
};

export type PageNode = ContainerBase & {
  type: NodeType.Page;
};

export type GridNode = ContainerBase & {
  type: NodeType.Grid;
};

export type Node =
  | TextNode
  | ImageNode
  | ChartNode
  | RichTextNode
  | TableNode
  | CodeNode
  | MarkdownNode
  | PageNode
  | GridNode;
