import slide from "../data/slide";
import imageURL from "../static/example.jpg";
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
      dfs(state.structure, node => {
        if (node.id === id) {
          node.name = value;
        }
      });
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
      if (type !== "children" && nodeId === 1) {
        alert("不能给根结点插入兄弟");
        return;
      }

      // 添加到组件
      const id = new Date().getTime();
      const cmp = {
        id,
        type: "panel",
        value: "colum",
        attrs: {
          span: [1, 2],
          flex: "column"
        },
        children: [
          {
            type: "text",
            value: value,
            id: "text" + id,
            attrs: {
              color: "#161DC6",
              fontSize: 50
            }
          },
          {
            type: "panel",
            value: "row",
            id: "panel" + id,
            attrs: {
              span: []
            },
            children: []
          }
        ]
      };

      state.components.push(cmp);

      // 添加到树中
      const slide = { id, name: value };
      if (type === "children") {
        dfs(state.structure, node => {
          if (node.id === nodeId) {
            node.children = node.children || [];
            node.children.push(slide);
          }
        });
      } else {
        dfs(state.structure, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === nodeId) {
                node.children.splice(index + 1, 0, slide);
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
              // 删除节点
              node.children.splice(index, 1);

              // 修改 span
              node.attrs.span.splice(index, 1);
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

              // 修改 span
              node.attrs.span.splice(index, 1);
            }
          });
      });

      // 加入新的 father
      dragNode &&
        dfs(slide, node => {
          if (node.id === father) {
            node.children = node.children || [];
            node.children.push(dragNode);

            // 修改 span
            node.attrs.span.push(1);
          }
        });

      dragNode && (state.selectedComponentId = dragNode.id);
      return state;
    },
    createCmp(state, action) {
      const { type, method } = action.payload;
      const slide = state.components.find(item => item.id === state.selectedId);

      // 确定插入的类型
      const id = new Date().getTime();
      const mp = {
        text: {
          type: "text",
          id,
          value: "hello world",
          attrs: {}
        },
        image: {
          type: "image",
          id,
          value: imageURL,
          attrs: {}
        },
        canvas: {
          type: "canvas",
          id,
          value:
            'function(ctx, width, height){ctx.fillStyle = "black"; ctx.fillRect(0, 0, 100, 100)}',
          attrs: {}
        },
        panel: {
          type: "panel",
          id,
          value: "row",
          attrs: { span: [], flex: "row" },
          children: []
        }
      };
      const cmp = mp[type];

      // 确定插入的位置
      if (method === "children") {
        dfs(slide, node => {
          if (node.id !== state.selectedComponentId) return;
          if (node.type !== "panel") {
            alert("只能插入布局节点");
            return;
          }
          node.children.push(cmp);
          node.attrs.span.push(1);
        });
      } else {
        dfs(slide, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === state.selectedComponentId) {
                node.children.splice(index + 1, 0, cmp);
                node.attrs.span.splice(index + 1, 0, 1);
              }
            });
        });
      }
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

              // 修改 span
              node.attrs.span.splice(index, 1);
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

                // 修改 span
                node.attrs.span.splice(idx, 0, 1);
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
      const { type } = action.payload;
      const id = new Date().getTime();

      let newAttr;
      if (type === "number") {
        newAttr = {
          id,
          type: "number",
          name: "未命名",
          value: 0
        };
      } else if (type === "color") {
        newAttr = {
          id,
          type: "color",
          name: "未命名",
          value: "#ffffff"
        };
      }
      state.attributeVars.unshift(newAttr);
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
    },
    setValueOfCmp(state, action) {
      const { value, cmpId, rootId } = action.payload;
      const slide = state.components.find(item => item.id === rootId);
      dfs(slide, node => {
        if (node.id === cmpId) {
          node.value = value;
        }
      });
      return state;
    }
  }
};
