import helpFile from "../static/data/help.json";
import { saveAs } from "file-saver";
import { dfs, descendant } from "../utils/tree";
import {
  createCanvas,
  createImage,
  createPanel,
  createSlide,
  createText,
  createFile
} from "../utils/create";

const imageURL = "https://i.loli.net/2020/03/18/g21ro4tTCAQ3nXO.jpg";

function initData() {
  const data = JSON.parse(localStorage.getItem("uIdea")) || helpFile;
  data.selectedId = 1;
  return data;
}

export default {
  namespace: "slides",
  state: initData(),
  effects: {},
  reducers: {
    /***** 和 Idea 有关  ******/
    deleteIdea(state, action) {
      const { id } = action.payload;
      const idea = state.ideas.find(item => item.id === id);
      const index = state.ideas.indexOf(idea);
      state.ideas.splice(index, 1);
      return state;
    },

    saveIdea(state, action) {
      const { id, value } = action.payload;
      const idea = state.ideas.find(item => item.id === id);
      idea.value = value;
      return state;
    },

    appendIdea(state, action) {
      const { nodeId, ideaId } = action.payload;
      const idea = state.ideas.find(item => item.id === ideaId),
        idx = state.ideas.indexOf(idea);
      const slide = state.components.find(item => item.id === nodeId);

      // 添加到 slide 到最后
      slide.children.push(idea);
      slide.attrs.span.push(1);

      // 从 idea 里面删除
      state.ideas.splice(idx, 1);

      // 跳转到更新页
      state.selectedId = nodeId;
      return state;
    },
    /****** 和文件操作有关 *******/

    // 保存到缓存
    save(state, action) {
      try {
        localStorage.setItem("uIdea", JSON.stringify(state));
        alert("保存成功！");
      } catch (e) {
        alert("保存失败！请直接下载到本地！");
      }
      return state;
    },
    // 上传 json 文件
    upload(state, action) {
      const { data } = action.payload;
      return data;
    },
    // 以 json 格式下载到本地
    download(state, action) {
      const file = new File(
        [JSON.stringify(state)],
        `${state.filename}.uidea`,
        {
          type: "text/plain;charset=utf-8"
        }
      );
      saveAs(file);
      return state;
    },
    // 创建新的 ppt
    createNewFile(state, action) {
      return createFile();
    },

    createHelp() {
      return helpFile;
    },

    /******** 和设置当前 active 的东西有关 *********/
    // 设置当前 active 的 panel
    setSelectedPanel(state, action) {
      const { type } = action.payload;
      state.selectedPanel = type;
      return state;
    },
    // 设置当前 active 的 ppt
    setSelected(state, action) {
      const { id } = action.payload;
      state.selectedId = id;
      return state;
    },
    // 设置当前 active 的 cmp
    setSelectedComp(state, action) {
      const { id, type = 2 } = action.payload;
      state.selectedComponentId = id;
      state.selectedPanel = type;
      return state;
    },
    gotoPre(state) {
      const { structure, selectedId } = state;
      const nodes = descendant(structure);
      const pre = nodes.find((item, index) => {
        if (index === nodes.length - 1) return;
        return nodes[index + 1].id === selectedId;
      });
      if (pre) {
        state.selectedId = pre.id;
        return state;
      } else {
        alert("已经是第一页了！");
        return state;
      }
    },
    gotoNext(state) {
      const { structure, selectedId } = state;
      const nodes = descendant(structure);
      const next = nodes.find((item, index) => {
        if (!index) return;
        return nodes[index - 1].id === selectedId;
      });
      if (next) {
        state.selectedId = next.id;
        return state;
      } else {
        alert("已经是最后一页了！");
        return state;
      }
    },

    /********* 操作大纲的节点 ********/

    // 更新大纲的 value
    updateNodeValue(state, action) {
      const { id, value } = action.payload;
      dfs(state.structure, node => {
        if (node.id === id) {
          node.name = value;
        }
      });

      // 看一看对应的 cmp 中有没有 isTitle 的 text 组件，如果有就更新相应的组件
      const slide = state.components.find(item => item.id === id);
      dfs(slide, node => {
        node.type === "text" && node.attrs.isTitle && (node.value = value);
      });
      return state;
    },
    // 删除大纲的节点
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
    // 创建一个新的节点
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
            node.children.splice(0, 0, slide);
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
    // 将 node 插入当前节点的 children 的最后一个
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
    // 将节点插入当前节点的前面或者后面
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

    /**** 和操作 cmp 有关 ********/

    // 删除 cmp
    deleteCmp(state, action) {
      const { rootId, id } = action.payload;
      const slide = state.components.find(item => item.id === rootId);
      let deletedIdea;
      dfs(slide, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              // 删除节点
              const ideas = node.children.splice(index, 1);
              deletedIdea = ideas[0];
              // 修改 span
              node.attrs.span.splice(index, 1);
            }
          });
      });

      // 添加进 idea
      state.ideas = state.ideas || [];
      let ideas = [];
      if (deletedIdea.type === "panel") {
        dfs(deletedIdea, node => {
          if (node.type !== "panel") {
            ideas.push(node);
          }
        });
      } else {
        ideas.push(deletedIdea);
      }
      state.ideas.push(...ideas);

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
          node.children.splice(0, 0, cmp);
          node.attrs.span.splice(0, 0, 1);
        });
      } else if (method === "brother") {
        dfs(slide, node => {
          node.children &&
            node.children.forEach((item, index) => {
              if (item.id === state.selectedComponentId) {
                node.children.splice(index + 1, 0, cmp);
                node.attrs.span.splice(index + 1, 0, 1);
              }
            });
        });
      } else {
        // 放入 ideas 数组里面
        state.ideas = state.ideas || [];
        const ideas = [...state.ideas, cmp];
        state.ideas = ideas;
      }

      state.selectedComponentId = cmp.id;
      return state;
    },
    insertCmp(state, action) {
      const { id, brother, before, rootId } = action.payload;
      const slide = state.components.find(item => item.id === rootId);

      // 从旧的 father 删除
      let dragNode = null;
      let deleteSpan = null;
      dfs(slide, node => {
        node.children &&
          node.children.forEach((item, index) => {
            if (item.id === id) {
              dragNode = item;
              node.children.splice(index, 1);

              // 修改 span
              [deleteSpan] = node.attrs.span.splice(index, 1);
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
                const addSpan = deleteSpan ? deleteSpan : 1;
                node.attrs.span.splice(idx, 0, addSpan);
                isAdd = true;
              }
            });
        });

      dragNode && (state.selectedComponentId = dragNode.id);
      return state;
    },
    // 交换 cmp 的位置
    exchangeCmp(state, action) {
      const { a, b, root } = action.payload;
      const slide = state.components.find(item => item.id === root);
      let isChange = false;
      dfs(slide, node => {
        if (!node.children || isChange) return;
        let i1, i2;
        node.children.forEach((d, i) => {
          dfs(d, n => {
            n.id === a && (i1 = i);
            n.id === b && (i2 = i);
          });
        });
        if (i1 === undefined || i2 === undefined || i1 === i2) return;
        // 修改 span
        const t = node.attrs.span[i1];
        node.attrs.span[i1] = node.attrs.span[i2];
        node.attrs.span[i2] = t;

        // 交换孩子
        const tn = node.children[i1];
        node.children[i1] = node.children[i2];
        node.children[i2] = tn;
        isChange = true;
      });
      return state;
    },

    /****** 改变 cmp 的属性 *********/
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

    /********* 和操作属性变量有关 ***********/

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
    }
  }
};
