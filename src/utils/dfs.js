function dfs(node, callback) {
  callback(node);
  node.children && node.children.forEach(item => dfs(item, callback));
}

export default dfs;
