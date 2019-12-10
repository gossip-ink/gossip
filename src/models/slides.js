const state = {
  filname: "hello world",
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
  if (node.children) {
    node.children.forEach(item => callback(item));
  }
}

export default {
  namespace: "slides",
  state,
  effects: {},
  reducers: {
    updateNodeValue(state, action) {
      const { id, value } = action.payload;
      const index = getIndexById(id, state);

      const updatedComponent = { ...state.components[index] };
      updatedComponent.name = value;

      const updatedComponents = [...state.components];
      updatedComponents.splice(index, 1, updatedComponent);

      return { ...state, components: updatedComponents };
    },
    deleteNode(state, action) {
      const { id } = action.payload;
      const index = getIndexById(id, state);

      // 从数组中删除
      const updatedComponents = [...state.components];
      if (index !== 0) {
        updatedComponents.splice(index, 1);
      }

      // 从树中删除
      const updatedStructure = { ...state.structure };
      dfs(updatedStructure, node => {
        if (node.children) {
          let index = null;
          node.children.forEach((item, idx) => {
            if (item.id === id) {
              index = idx;
            }
          });

          if (index !== null) {
            const updatedChildren = [...node.children];
            updatedChildren.splice(index, 1);
            node.children = updatedChildren;
          } else {
            node.children = [...node.children];
          }
        }
      });

      return {
        ...state,
        components: updatedComponents,
        structure: updatedStructure
      };
    },
    addNode(state, action) {
      const { father, value } = action.payload;

      // 添加到数组中
      const id = new Date().getTime();
      const updatedComponents = [...state.components, { id, name: value }];

      // 添加到树中
      const updatedStructure = { ...state.structure };
      dfs(updatedStructure, node => {
        const children = node.children ? [...node.children] : [];
        if (node.id === father) {
          node.children = [...children, { id }];
        } else {
          node.children = children;
        }
      });

      return {
        ...state,
        components: updatedComponents,
        structure: updatedStructure
      };
    }
  }
};
