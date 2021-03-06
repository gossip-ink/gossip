export type TreeNode<T> = {
  readonly id: string;
  children: TreeNode<T>[];
  data: T;
}

type TreeLayoutNode<T> = TreeNode<T> & {
  height: number;
};

type CallBack<T> = (node: TreeNode<T>) => void

export function dfs<T>(root: TreeNode<T>, callback: CallBack<T>, after?: () => void): void {
  callback(root);
  if (!root.children) return;
  for (const node of root.children) {
    dfs(node, callback, after);
  }
  after && after();
}

export function nodes<T>(root: TreeNode<T>): TreeNode<T>[] {
  const nodes: TreeNode<T>[] = [];
  dfs(root, (node) => nodes.push(node));
  return nodes;
}

export function treeLayout<T>(root: TreeNode<T>, nested: boolean): TreeLayoutNode<T>[] {
  const nodes: TreeLayoutNode<T>[] = [];
  let height = -1;

  dfs(root, node => {
    height++;
    nodes.push({
      ...node,
      height
    });
  }, () => height--);

  return nodes;
}
