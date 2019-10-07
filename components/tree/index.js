Vue.component('tree', {
  props: ['nodes'],
  template: `<div id="tree"
                >
                <node v-for="node in nodes"
                  v-key="node.id"
                  :nodeData="node"
                  @clickCircle="changeState"
                  @clickRect="selectNode"
                  @dragNodeStart="ondragstart"
                  @dragNodeEnd="ondragend"
                  @dragNodeMove="ondrag"
                >
             </div>`,
  data: function() {
    const nodeSize = this.nodes[0].r || 0;
    return {
      transfrom: `translate(${nodeSize}, ${nodeSize})`,
      nodeSize,
      closeParent: null,
      insertIndex: 0,
      offsetX: 0,
      offsetY: 0
    }
  },
  created: function() {
    document.onkeydown = e => {
      const key = window.event.keyCode;
      if (key === 13) { // enter
        e.preventDefault();
        this._interactWithSelctedNode('addSibling');
      } else if (key === 9) { // tab
        e.preventDefault();
        this._interactWithSelctedNode('addChild');
      } else if (key === 8) { // back space
        e.preventDefault();
        this._interactWithSelctedNode('deleteSelf');
      } else if (key === 38) { // Up Arrow
        e.preventDefault();
        this._interactWithSelctedNode('selectUpSibling');
      } else if (key === 40) { // down down
        e.preventDefault();
        this._interactWithSelctedNode('selectDownSibling');
      } else if (key === 37) { // left arrow
        e.preventDefault();
        this._interactWithSelctedNode('selectParent');
      } else if (key === 39) { // right arrow
        e.preventDefault();
        this._interactWithSelctedNode('selectFirstChild');
      }
    }
  },
  methods: {
    selectNode: function(node) {
      for (let n of this.nodes) {
        if (n != node) {
          n.selected = false;
        }
      }
      node.selected = !node.selected;
      this.update();
    },

    changeState: function(node, e) {
      node.changeState();
      this.update();
    },

    update: function() {
      this.$emit('update');
    },

    ondragstart: function(node, e) {
      if (node.parent === null) {
        return;
      }
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;

      node.dragstart();
      this.update();
    },

    ondrag: function(node, e) {
      if (node.parent === null) {
        return;
      }
      const { clientX, clientY, offsetX, offsetY } = e;
      const x = offsetX + node.x - this.offsetX, y = offsetY + node.y - this.offsetY;
      const parent = this._findCloseParent(x, y);

      if (parent === null)  {
        return;
      }

      if(parent === this.closeParent){
        this.insertIndex = this._findCloseChild(parent, x, y);
        this.update();
        return;
      }

      parent.highlight = true;
      if (this.closeParent) {
        this.closeParent.highlight = false;
      }
      this.closeParent = parent;
      this.insertIndex = this._findCloseChild(parent, x, y);
      this.update();
    },

    ondragend: function(node) {
      if (node.parent === null) {
        return;
      }
      node.dragend();
      this.closeParent.highlight = false;
      this.closeParent.insert(node, this.insertIndex);
      this.update();
    },

    _interactWithSelctedNode: function(callback) {
      for (let n of this.nodes) {
        if (n.selected) {
          n[callback]();
          break;
        }
      }
      this.update();
    },

    _findCloseParent: function(x, y) {
      let parent = null,
        closeDistance = Infinity;
      for (let n of this.nodes) {
        // 过滤掉被拖拽的节点
        if (n.draged) {
          continue;
        }
        const distance = this._dist(n.x, n.y, x, y);
        // 如果在左下方 且 距离最小
        if (y > n.y && x > n.x && closeDistance > distance) {
          parent = n;
          closeDistance = distance;
        }
      }
      return parent;
    },

    _findCloseChild: function(parent, x, y){
      let index = -1, closeDistance = Infinity;
      const children = parent.children;
      for(let i = 0; i < children.length; i++){
        const c = children[i];
        const distance = this._dist(c.x, c.y, x, y);
        // 在下方
        if(y > c.y && closeDistance > distance){
          index = i;
          closeDistance = distance;
        }
      }
      return index + 1;
    },

    _dist(x1, y1, x2, y2) {
      return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    }
  }
})