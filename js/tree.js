class Tree {
  constructor(treeData, nodeSize) {
    this.nodeSize = nodeSize;
    this.root = this.initNodeByJson(treeData, null);
  }

  initNodeByJson(treeData, parent) {
    const data = Object.assign(treeData.data, {name: treeData.name});
    const id = nextId();
    const node = new Node(id, data, parent, this.nodeSize);
    if(treeData.children){
      for(let n of treeData.children){
        node.children.push(this.initNodeByJson(n, node));
      }
    }
    return node;
  }

  getNodeById(id) {
    let selectedNode = null;
    this.eachAfter(function(node){
      if(node.id === id){
        selectedNode = node;
      }
    })
    if(selectedNode === null){
      throw Error('没有找到相应的节点！')
    }
    return selectedNode;
  }

  eachAfter(callback) {
    this._preTravse(this.root, callback);
  }

  eachBefore(callback){
    this._postTravse(this.root, callback)
  }

  nodes() {
    this._computeLayout();
    let nodes = [];
    this.eachBefore(function(node) {
      nodes.push(node);
    })
    return nodes;
  }
  _computeLayout() {
    let index = -1;
    this.eachAfter(node => {
      if(node.parent){
        node.depth = node.parent.depth + 1;
      }else{
        node.depth = 0;
      }
      node.y = ++index * this.nodeSize;
      node.x = node.depth * this.nodeSize;
    })
  }

  _preTravse(node, callback) {
    callback(node);
    if (node.children) {
      for (let c of node.children) {
        this._preTravse(c, callback);
      }
    }
  }

  _postTravse(node, callback) {
    if (node.children) {
      for (let c of node.children) {
        this._postTravse(c, callback);
      }
    }
    callback(node);
  }

}