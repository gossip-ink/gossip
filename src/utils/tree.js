// 和树操作有关的一些算法
function dfs(node, callback) {
  callback(node);
  node.children && node.children.forEach(item => dfs(item, callback));
}

function copyTree(tree) {
  const data = { ...tree, children: [] };
  function eachBefore(node, data) {
    node.children &&
      node.children.forEach(item => {
        const child = { ...item, children: [] };
        data.children.push(child);
        eachBefore(item, child);
      });
  }
  eachBefore(tree, data);
  return data;
}

function descendant(root) {
  const nodes = [];
  dfs(root, node => nodes.push(node));
  return nodes;
}

export { dfs, copyTree, descendant };

export default function(root) {
  let index = -1;
  const nodes = [];
  function setDepth(node) {
    nodes.push({
      ...node,
      depth: ++index
    });
    node.children && node.children.forEach(setDepth);
    index--;
  }
  setDepth(root);
  return nodes;
}
