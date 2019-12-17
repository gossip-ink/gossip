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
export { dfs, copyTree };
