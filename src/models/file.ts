import { PageNode } from "./node";
import { TreeNode } from "../utils/tree";

export type OutlineNode = TreeNode<{
  title: string,
  labels: string[]
  pageNodes: PageNode[]
}>
