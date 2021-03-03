import { PageNode } from "./node";

export type TreeNode<T> = {
  readonly id: string;
  children: TreeNode<T>[];
  data: T;
}

export type OutlineNode = TreeNode<{
  title: string,
  labels: string[]
  pageNodes: PageNode[]
}>
