import { PageNode, Node } from "./node";
import { TreeNode } from "../utils/tree";

export enum OutlineNodeState {
  Collapsed,
  Normal,
  Expanded,
}

export type Label = {
  readonly id: string;
  name: string;
  color: string;
};

export type OutlineData = {
  title: string;
  labels: Label[];
  pageNodeIDs: string[];
  state: OutlineNodeState;
};

export type OutlineNode = TreeNode<OutlineData>;

export type Effect = {}; // TODO

export type Meta = {
  name: string;
  author: string;
};

export type Content = {
  outline: OutlineNode;
  pages: PageNode[];
  assets: Node[];
  effects: Effect[];
};

export type State = {
  selectedPageID: string;
  selectedOutlineID: string;
  selectedAssetID: string;
  selectedNodeID: string;
  selectedEffectID: string;
  selectedAttributeID: string;
};

export type File = Meta & Content & State;
