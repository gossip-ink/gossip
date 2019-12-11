const state = {
  filname: "hello world",
  selectedId: 1,
  structure: {
    id: 1,
    children: [
      {
        id: 2
      },
      {
        id: 3,
        children: [
          {
            id: 4
          },
          {
            id: 5
          }
        ]
      }
    ]
  },
  components: [
    {
      id: 1,
      name: "uIdea"
    },
    {
      id: 2,
      name: "快速构建"
    },
    {
      id: 3,
      name: "炫酷效果"
    },
    {
      id: 4,
      name: "动画切换"
    },
    {
      id: 5,
      name: "词云模式"
    }
  ]
};

function getIndexById(id, state) {
  // 找到 index
  let index;
  state.components.forEach((item, idx) => {
    if (item.id === id) {
      index = idx;
    }
  });
  return index;
}

function dfs(node, callback) {
  callback(node);
  node.children && node.children.forEach(item => dfs(item, callback));
}

export default {
  namespace: "slides",
  state,
  effects: {},
  reducers: {
    updateNodeValue(state, action) {
      const { id, value } = action.payload;
      const index = getIndexById(id, state);
      state.components[index].name = value;
      return state;
    },
    deleteNode(state, action) {
      const { id } = action.payload;
      const index = getIndexById(id, state);

      // 从数组中删除
      state.components.splice(index, 1);

      // 从树中删除
      dfs(state.structure, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              node.children.splice(index, 1);
            }
          });
      });
      return state;
    },
    addNode(state, action) {
      const { father, value } = action.payload;

      // 添加到数组中
      const id = new Date().getTime();
      state.components.push({ id, name: value });

      // 添加到树中
      dfs(state.structure, node => {
        if (node.id === father) {
          node.children = node.children || [];
          node.children.push({ id });
        }
      });

      state.selectedId = id;

      return state;
    },
    appendNode(state, action) {
      const { id, father, head } = action.payload;

      // 从旧的 father 删除
      let dragNode = null;
      dfs(state.structure, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              dragNode = item;
              node.children.splice(index, 1);
            }
          });
      });

      // 加入新的 father
      dragNode &&
        dfs(state.structure, node => {
          if (node.id === father) {
            node.children = node.children || [];
           console.log(head)

            head
              ? node.children.splice(0, 0, dragNode)
              : node.children.push(dragNode);
          }
        });

      state.selectedId = dragNode.id;
      return state;
    },
    insertNode(state, action) {
      const { id, brother } = action.payload;

      // 从旧的 father 删除
      let dragNode = null;
      dfs(state.structure, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              dragNode = item;
              node.children.splice(index, 1);
            }
          });
      });

      // 添加到新到兄弟节点
      dragNode &&
        dfs(state.structure, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === brother) {
                node.children.splice(index + 1, 0, dragNode);
              }
            });
        });

      state.selectedId = dragNode.id;
      return state;
    },
    setSelected(state, action) {
      const { id } = action.payload;
      state.selectedId = id;
      return state;
    }
  }
};
