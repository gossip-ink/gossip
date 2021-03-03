import React from "react";
import { TreeNode } from "../models/file";

const Tree: React.FC<TreeProps<any>> = (props) => {
  return <h1></h1>;
};

export interface TreeProps<T> {
  nested?: boolean;
  node?: React.ReactNode;
  data?: TreeNode<T>;
}

export function dfs<T>(root: TreeNode<T>, callback: (node: TreeNode<T>) => void): void {
  callback(root);
  if (!root.children) return;
  for (const node of root.children) {
    dfs(node, callback);
  }
}

export function nodes<T>(root: TreeNode<T>): TreeNode<T>[] {
  const nodes: TreeNode<T>[] = [];
  dfs(root, (node) => nodes.push(node));
  return nodes;
}

export default Tree;
