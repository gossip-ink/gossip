class Node {
  constructor(id, data, parent, r) {
    this.id = id;
    this.data = data;
    this.x = 0;
    this.y = 0;
    this.r = r;
    this.parent = parent;
    this.children = [];
    this.selected = false;
    this.draged = false;
    this.highlight = false;

    if(data.layout === undefined){
      data.layout = 'row';
    }
  }

  addChild() {
    const id = nextId(),
      node = new Node(id, { name: id }, this, this.r);
    node.selected = true;
    this.selected = false;
    this.children.push(node);
  }

  changeState() {
    if (this.children === null) {
      this.children = this._children;
    } else {
      this._children = this.children;
      this.children = null;
    }
  }

  deleteSelf(selectParent = true) {
    if (this.parent === null) {
      return;
    }
    const children = this.parent.children,
      index = children.indexOf(this);

    if (selectParent) {
      this.parent.selected = true;
    }
    children.splice(index, 1);
  }

  addSibling() {
    if (this.parent === null) {
      return;
    }
    this.selected = false;
    const id = nextId(),
      children = this.parent.children,
      node = new Node(id, { name: id }, this.parent, this.r),
      index = children.indexOf(this);

    node.selected = true;
    children.splice(index + 1, 0, node);
  }

  selectUpSibling() {
    if (this.parent === null) {
      return;
    }
    const children = this.parent.children,
      index = children.indexOf(this);

    if (index > 0) {
      this.selected = false;
      children[index - 1].selected = true;
    }
  }

  selectDownSibling() {
    if (this.parent === null) {
      return;
    }
    const children = this.parent.children,
      index = children.indexOf(this);

    if (index < children.length - 1) {
      this.selected = false;
      children[index + 1].selected = true;
    }
  }

  selectFirstChild() {
    if (this.children && this.children.length > 0) {
      this.selected = false;
      this.children[0].selected = true;
    }
  }

  selectParent() {
    if (this.parent === null) {
      return;
    }
    this.selected = false;
    this.parent.selected = true;
  }

  dragstart() {
    this._preTravse(this, function(node) {
      node.draged = true;
    })
  }

  dragend() {
    this._preTravse(this, function(node) {
      node.draged = false;
    })
  }

  insert(node, index = 0) {
    // 删除旧的
    const children = node.parent.children,
      i = children.indexOf(node);
    children.splice(i, 1);

    // 添加新的，默认添加到第一个
    node.parent = this;
    this.children.splice(index, 0, node);
  }

  _preTravse(node, callback) {
    callback(node);
    if (node.children) {
      for (let n of node.children) {
        this._preTravse(n, callback);
      }
    }
  }
}