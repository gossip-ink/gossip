export type TreeNode<T> = {
  readonly id: string;
  children: TreeNode<T>[];
  data: T;
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
