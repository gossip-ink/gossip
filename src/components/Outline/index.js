import classNames from "./index.css";
import { connect } from "dva";
import { useState } from "react";
import Node from "../Node";
import TreeNode from "../TreeNode";
import tree, { dfs } from "../../utils/tree";
import { Icon } from "antd";
import { max } from "d3-array";

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
    }),
    hideNodeChildren: id => ({
      type: "slides/hideNodeChildren",
      payload: { id }
    }),
    showNodeChildren: id => ({
      type: "slides/showNodeChildren",
      payload: { id }
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
  setSelectedPanel,
  appendIdea,
  hideNodeChildren,
  showNodeChildren
}) {
  const [edit, setEdit] = useState(-1);
  const indent = 20;
  const nodes = tree(structure);
  const nodeWidth = 170;
  const h = max(nodes, node => node.depth);

  const styles = {
    container: {
      height
    },
    tree: {
      width: nodeWidth + indent * h + 50
    },
    treeNode: node => ({
      marginLeft: node.depth * indent
    })
  };

  function handleEidtNode(item) {
    edit === item.id ? setEdit(-1) : setEdit(item.id);
    setSelected(item.id);
  }

  function handleTitleChange(e, id) {
    const value = e.target.value;
    updateNodeValue(id, value);
  }

  function handleSelectSlide(id) {
    selectedId !== id && setSelected(id);
  }

  function handleNodeDrop(sourceNodeId, targetNodeId, type, dragType, depth) {
    showNodeChildren(sourceNodeId);
    if (sourceNodeId === targetNodeId && type !== "left") return;
    if (sourceNodeId !== targetNodeId && type == "left") return;
    if (dragType === "node") {
      if (type === "top") {
        insertNode(sourceNodeId, targetNodeId, true);
      } else if (type === "middle") {
        appendNode(sourceNodeId, targetNodeId);
      } else if (type === "bottom") {
        insertNode(sourceNodeId, targetNodeId);
      } else if (type === "left") {
        const parents = nodes.filter(n => n.depth === depth);
        for (let p of parents) {
          let findId = null;
          dfs(p, node => {
            if (node.id !== sourceNodeId) return;
            findId = p.id;
          });
          if (findId) {
            insertNode(sourceNodeId, findId);
          }
        }
      }
    } else if (dragType === "idea") {
      appendIdea(sourceNodeId, targetNodeId);
    }
  }

  return (
    <div
      style={styles.container}
      onClick={() => {
        setSelectedPanel(0);
        setEdit(-1);
      }}
    >
      <div style={styles.tree}>
        {nodes.map(item => (
          <TreeNode
            key={item.id}
            node={item}
            onNodeDrop={handleNodeDrop}
            highlightColor="#4091f7"
            style={styles.treeNode(item)}
            width={nodeWidth}
            hasBottom={item.depth !== 0}
            hasTop={item.depth !== 0}
            canDrag={item.depth !== 0}
            onClickBottom={() => createNode(item.id, "新的观点", "brother")}
            onClickRight={() => createNode(item.id, "新的观点", "children")}
            onNodeDrag={() => hideNodeChildren(item.id)}
          >
            <Node
              height="1.5em"
              width={nodeWidth}
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
              nomove={true}
              hasDelete={item.depth !== 0}
              onClick={e => {
                handleSelectSlide(item.id);
                e.stopPropagation();
              }}
            >
              <div className={classNames.nodeTitle}>
                <Icon type="drag" className={classNames.dragIcon} />
                {edit !== item.id ? (
                  <div onClick={() => handleSelectSlide(item.id)}>
                    {item.name === "" ? "没有标题" : item.name}
                  </div>
                ) : (
                  <input
                    value={item.name}
                    onChange={e => handleTitleChange(e, item.id)}
                    onClick={e => e.stopPropagation()}
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
