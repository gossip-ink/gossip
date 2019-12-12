import slide from "../data/slide";
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
  state: slide,
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
    createNode(state, action) {
      const { nodeId, value, type } = action.payload;

      // 添加到数组中
      const id = new Date().getTime();
      state.components.push({ id, name: value });

      // 添加到树中
      if (type === "children") {
        dfs(state.structure, node => {
          if (node.id === nodeId) {
            node.children = node.children || [];
            node.children.push({ id });
          }
        });
      } else {
        dfs(state.structure, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === nodeId) {
                node.children.splice(index + 1, 0, { id });
              }
            });
        });
      }

      state.selectedId = id;
      return state;
    },
    appendNode(state, action) {
      const { id, father } = action.payload;

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
            node.children.push(dragNode);
          }
        });

      state.selectedId = dragNode.id;
      return state;
    },
    insertNode(state, action) {
      const { id, brother, before } = action.payload;

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
      let isAdd = false;
      dragNode &&
        dfs(state.structure, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === brother && !isAdd) {
                const idx = before ? index : index + 1;
                node.children.splice(idx, 0, dragNode);
                isAdd = true;
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
    },
    setSelectedComp(state, action) {
      const { id } = action.payload;
      state.selectedComponentId = id;
      return state;
    },
    deleteCmp(state, action) {
      const { rootId, id } = action.payload;
      const slide = state.components.find(item => item.id === rootId);
      dfs(slide, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              node.children.splice(index, 1);
            }
          });
      });
      return state;
    },
    appendCmp(state, action) {
      const { id, father, rootId } = action.payload;
      const slide = state.components.find(item => item.id === rootId);

      // 从旧的 father 删除
      let dragNode = null;
      dfs(slide, node => {
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
        dfs(slide, node => {
          if (node.id === father) {
            node.children = node.children || [];
            node.children.push(dragNode);
          }
        });

      dragNode && (state.selectedComponentId = dragNode.id);
      return state;
    },
    insertCmp(state, action) {
      const { id, brother, before, rootId } = action.payload;
      const slide = state.components.find(item => item.id === rootId);

      // 从旧的 father 删除
      let dragNode = null;
      dfs(slide, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              dragNode = item;
              node.children.splice(index, 1);
            }
          });
      });

      // 添加到新到兄弟节点
      let isAdd = false;
      dragNode &&
        dfs(slide, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === brother && !isAdd) {
                const idx = before ? index : index + 1;
                node.children.splice(idx, 0, dragNode);
                isAdd = true;
              }
            });
        });

      dragNode && (state.selectedComponentId = dragNode.id);
      return state;
    },
    changeAttr(state, action) {
      const { value, key, cmpId, rootId } = action.payload;

      const slide = state.components.find(item => item.id === rootId);
      let cmp;
      dfs(slide, node => {
        node.id === cmpId && (cmp = node);
      });
      cmp && (cmp.attrs[key] = value);
      cmp && cmp.type === "panel" && (cmp.value = value);
      return state;
    },
    deleteVar(state, action) {
      const { id } = action.payload;
      const v = state.attributeVars.find(item => item.id === id);
      const index = state.attributeVars.indexOf(v);

      // 修改使用了这个变量的组件的属性到它的值
      state.components.forEach(item => {
        dfs(item, node => {
          const { attrs } = node;
          attrs &&
            Object.keys(attrs).forEach(key => {
              const value = attrs[key];
              if (typeof value === "string" && value[0] === "$") {
                // 如果是一个变量
                const vid = parseInt(value.slice(1));
                if (id === vid) {
                  attrs[key] = v.value;
                }
              }
            });
        });
      });

      state.attributeVars.splice(index, 1);

      return state;
    },
    addVar(state, action) {
      const id = new Date().getTime();
      state.attributeVars.unshift({
        id,
        type: "number",
        name: "未命名",
        value: 0
      });
      state.selectedArributeId = id;
      return state;
    },
    selectVar(state, action) {
      const { id } = action.payload;
      state.selectedArributeId = id;
      return state;
    },
    changeVar(state, action) {
      const { value, type } = action.payload;
      const variable = state.attributeVars.find(
        item => item.id === state.selectedArributeId
      );

      // 转换成数值
      let toNumber = parseInt(value);
      variable[type] = isNaN(toNumber) ? value : toNumber;
      return state;
    },
    deleteVarForCmp(state, action) {
      const { key, cmpId, rootId } = action.payload;
      const slide = state.components.find(item => item.id === rootId);

      dfs(slide, node => {
        if (node.id !== cmpId) {
          return;
        }
        const { attrs } = node;
        const value = attrs[key];
        const vid = parseInt(value.slice(1));
        const v = state.attributeVars.find(item => item.id === vid);
        attrs[key] = v.value;
      });
    }
  }
};
