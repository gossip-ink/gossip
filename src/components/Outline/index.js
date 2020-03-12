import classNames from "./index.css";
import { connect } from "dva";
import { useEffect, useState } from "react";
import Node from "../Node";
import TreeNode from "../TreeNode";
import tree, { dfs } from "../../utils/tree";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    selectedPanel: state.slides.selectedPanel
  }),
  {
    createNode: (nodeId, value, type) => ({
      type: "slides/createNode",
      payload: { nodeId, value, type }
    }),
    updateNodeValue: (id, value) => ({
      type: "slides/updateNodeValue",
      payload: { id, value }
    }),
    deleteNode: id => ({ type: "slides/deleteNode", payload: { id } }),
    insertNode: (id, brother, before = false) => ({
      type: "slides/insertNode",
      payload: { id, brother, before }
    }),
    appendNode: (id, father) => ({
      type: "slides/appendNode",
      payload: { id, father }
    }),
    setSelected: id => ({ type: "slides/setSelected", payload: { id } }),
    setSelectedPanel: type => ({
      type: "slides/setSelectedPanel",
      payload: { type }
    }),
    appendIdea: (ideaId, nodeId) => ({
      type: "slides/appendIdea",
      payload: { nodeId, ideaId }
    })
  }
)(function({
  height,
  structure,
  selectedId,
  setSelected,
  createNode,
  updateNodeValue,
  deleteNode,
  appendNode,
  insertNode,
  selectedPanel,
  setSelectedPanel,
  appendIdea,
  setIsDrag
}) {
  const [edit, setEdit] = useState(-1);
  const indent = 20;
  const nodes = tree(structure);
  const title = string => string;

  const styles = {
    container: {
      height
    },
    treeNode: node => ({
      marginLeft: node.depth * indent
    })
  };

  function handleEidtNode(item) {
    edit === item.id ? setEdit(-1) : setEdit(item.id);
    setSelected(item.id);
  }

  function handleCreateNode(id, type) {}

  function handleTitleChange(e, id) {
    const value = e.target.value;
    updateNodeValue(id, value);
  }

  function handleNodeDrop(sourceNodeId, targetNodeId, type, dragType) {
    if (dragType === "node") {
      if (type === "top") {
        insertNode(sourceNodeId, targetNodeId, true);
      } else if (type === "middle") {
        appendNode(sourceNodeId, targetNodeId);
      } else if (type === "bottom") {
        insertNode(sourceNodeId, targetNodeId);
      }
    } else if (dragType === "idea") {
      appendIdea(sourceNodeId, targetNodeId);
      setIsDrag(false);
    }
  }

  useEffect(() => {
    function down() {
      const node = nodes.find(item => item.id === selectedId);
      const index = nodes.indexOf(node);
      if (index === nodes.length - 1) return;
      setSelected(nodes[index + 1].id);
    }
    function keydown(e) {
      const handlers = {
        13: () => {
          if (edit) {
            down();
            return;
          }
          if (selectedId === 1) {
            alert("根元素没有兄弟");
          } else {
            createNode(selectedId, "", "brother");
          }
        }, //enter
        9: () => {
          createNode(selectedId, "", "children");
        }, //tab
        8: () => {
          if (selectedId === 1) {
            alert("不能删除根元素");
          } else {
            deleteNode(selectedId);
          }
        }, // back space
        38: () => {
          const node = nodes.find(item => item.id === selectedId);
          const index = nodes.indexOf(node);
          if (index === 0) return;
          setSelected(nodes[index - 1].id);
        }, // up
        40: down, //down
        37: () => {
          let id;
          dfs(structure, node => {
            node.children &&
              node.children.forEach(item => {
                if (item.id === selectedId) {
                  id = node.id;
                }
              });
          });
          id && setSelected(id);
        }, //left
        39: () => {
          const node = nodes.find(item => item.id === selectedId);
          const index = nodes.indexOf(node);
          if (index === nodes.length - 1) return;
          setSelected(nodes[index + 1].id);
        } //right
      };

      const handler = handlers[e.keyCode];
      !edit && handler && handler();
      edit && e.keyCode === 13 && handler();
    }
    if (selectedPanel === 0) {
      // window.addEventListener("keydown", keydown);
    }

    return () => {
      // window.removeEventListener("keydown", keydown);
    };
  });


  return (
    <div
      style={styles.container}
      className={classNames.container}
      onClick={() => setSelectedPanel(0)}
    >
      <div className={classNames.tree}>
        {nodes.map(item => (
          <TreeNode
            key={item.id}
            node={item}
            onNodeDrop={handleNodeDrop}
            highlightColor="#4091f7"
            style={styles.treeNode(item)}
            width="190px"
            hasBottom={item.id !== 1}
            onClickBottom={() => createNode(item.id, "新的想法", "brother")}
            onClickRight={() => createNode(item.id, "新的想法", "children")}
          >
            <Node
              height="2em"
              width="190px"
              edit={edit === item.id}
              onEdit={e => {
                handleEidtNode(item);
                e.stopPropagation();
              }}
              onDelete={e => {
                deleteNode(item.id);
                e.stopPropagation();
              }}
              highlight={item.id === selectedId}
            >
              <div
                className={classNames.nodeTitle}
                onClick={() => selectedId !== item.id && setSelected(item.id)}
              >
                {edit !== item.id ? (
                  <div
                    onClick={() =>
                      selectedId !== item.id && setSelected(item.id)
                    }
                  >
                    {item.name === "" ? "未编辑" : title(item.name)}
                  </div>
                ) : (
                  <input
                    value={item.name}
                    onChange={e => handleTitleChange(e, item.id)}
                  />
                )}
              </div>
            </Node>
          </TreeNode>
        ))}
      </div>
    </div>
  );
});
