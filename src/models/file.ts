import { PageNode } from "./node";
import { TreeNode } from "../utils/tree";

export type OutlineData = {
  title: string,
  labels: string[]
  pageNodes: PageNode[]
};

export type OutlineNode = TreeNode<OutlineData>
