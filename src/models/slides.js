import imageURL from "../static/example.jpg";
import { saveAs } from "file-saver";
import { dfs } from "../utils/tree";
import {
  createCanvas,
  createImage,
  createPanel,
  createSlide,
  createText,
  createFile
} from "../utils/create";

function initData() {
  const data = JSON.parse(localStorage.getItem("uIdea")) || createFile();
  data.selectedId = 1;
  return data;
}

export default {
  namespace: "slides",
  state: initData(),
  effects: {},
  reducers: {
    save(state, action) {
      localStorage.setItem("uIdea", JSON.stringify(state));
      alert("保存成功！");
      return state;
    },
    setSelectedPanel(state, action) {
      const { type } = action.payload;
      state.selectedPanel = type;
      return state;
    },
    createNewFile(state, action) {
      return createFile();
    },
    download(state, action) {
      const file = new File([JSON.stringify(state)], `${state.filename}.json`, {
        type: "text/plain;charset=utf-8"
      });
      saveAs(file);
      return state;
    },
    updateNodeValue(state, action) {
      const { id, value } = action.payload;
      dfs(state.structure, node => {
        if (node.id === id) {
          node.name = value;
        }
      });

      // 看一看对应的 cmp 中有没有 isTitle 的 text 组件
      const slide = state.components.find(item => item.id === id);
      dfs(slide, node => {
        node.type === "text" && node.attrs.isTitle && (node.value = value);
      });
      return state;
    },
    deleteNode(state, action) {
      const { id } = action.payload;
      // 找到 index
      const cmp = state.components.find(item => item.id === id);
      const index = state.components.indexOf(cmp);

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

      state.selectedId = 1;
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
      const cmp = createSlide(id, value);

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
      const { id, type = 2 } = action.payload;
      state.selectedComponentId = id;
      state.selectedPanel = type;
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
    upload(state, action) {
      const { data } = action.payload;
      return data;
    },
    createCmp(state, action) {
      const { type, method } = action.payload;
      const slide = state.components.find(item => item.id === state.selectedId);

      // 确定插入的类型
      const id = new Date().getTime();
      const mp = {
        text: createText(id, "text", { isTitle: false }),
        image: createImage(id, imageURL),
        canvas: createCanvas(
          id,
          `function(canvas, ctx, width, height){
          const size = 100,
            x = (width - size) / 2,
            y = (height - size) / 2;
          ctx.fillStyle = "black";
          ctx.fillRect(x, y, size, size);
        }`
        ),
        panel: createPanel(id, "column", {}, [])
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
      const {
        value,
        key,
        cmpId = state.selectedComponentId,
        rootId = state.selectedId
      } = action.payload;

      const slide = state.components.find(item => item.id === rootId);
      let cmp;
      dfs(slide, node => {
        node.id === cmpId && (cmp = node);
      });

      cmp && cmp.attrs && (cmp.attrs[key] = value);
      cmp && cmp.type === "panel" && key === "flex" && (cmp.value = value);

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

          // 如果是文字，且还有 isTitle，修改对应的 structure 的 name
          node.type === "text" &&
            node.attrs.isTitle === true &&
            dfs(state.structure, item => {
              item.id === rootId && (item.name = value);
            });
        }
      });
      return state;
    }
  }
};
