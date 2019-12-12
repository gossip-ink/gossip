import styles from "./index.css";
import { connect } from "dva";
import { Button } from "antd";
import { useState } from "react";
import TreeNode from "../../components/TreeNode/index";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components,
    selectedId: state.slides.selectedId
  }),
  {
    createNode: (nodeId, value, type) => ({
      type: "slides/createNode",
      payload: { nodeId, value, type}
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
    setSelected: id => ({ type: "slides/setSelected", payload: { id } })
  }
)(function({
  height,
  structure,
  components,
  selectedId,
  setSelected,
  createNode,
  updateNodeValue,
  deleteNode,
  appendNode,
  insertNode
}) {
  const [edited, setEdited] = useState(null);

  function getNameById(id) {
    let name = null;
    components.forEach(item => {
      if (item.id === id) {
        name = item.name;
      }
    });
    return name;
  }

  function getNodes() {
    // 布局，并且获得 name
    const nodes = [];
    let index = -1;
    const indent = 15;
    function dfs(node) {
      const treeNode = {
        ...node,
        marginLeft: ++index * indent,
        name: getNameById(node.id)
      };
      nodes.push(treeNode);

      node.children &&
        node.children.forEach(element => {
          dfs(element);
        });

      index--;
    }
    dfs(structure);
    return nodes;
  }

  function handleCreateNode(type) {
    const input = document.getElementById("node-input");
    const value = input.value;
    if (value === "") {
      alert("不能为空");
      return;
    }
    if (type === "brother") {
      createNode(selectedId, value, type);
    } else {
      createNode(selectedId, value, type);
    }
  }

  function handleTitleChange(e, id) {
    const value = e.target.value;
    updateNodeValue(id, value);
  }

  function handleDeleteNode(id) {
    deleteNode(id);
  }

  function handleSelectNode(id) {
    setSelected(id);
    setEdited(null);
  }

  function handleClickEdit(id) {
    if (edited === id) {
      setEdited(null);
    } else {
      setEdited(id);
      setSelected(id);
    }
  }

  function handleNodeDrop(sourceNodeId, targetNodeId, type) {
    if (type === "top") {
      insertNode(sourceNodeId, targetNodeId, true);
    } else if (type === "middle") {
      appendNode(sourceNodeId, targetNodeId);
    } else if (type === "bottom") {
      insertNode(sourceNodeId, targetNodeId);
    }
  }

  const nodes = getNodes();
  console.log(nodes);

  return (
    <div style={{ height }} className={styles.container}>
      <h1>Outline</h1>
      <div>
        <input id="node-input"></input>
        <Button
          type="primary"
          icon="down"
          shape="circle"
          onClick={() => handleCreateNode("brother")}
        />
        <Button
          type="primary"
          icon="right"
          shape="circle"
          onClick={() => handleCreateNode("children")}
        />
      </div>
      <div>
        {nodes.map((item, index) => (
          <TreeNode
            key={index}
            marginLeft={item.marginLeft}
            node={item}
            onNodeDrop={handleNodeDrop}
            highlightColor="red"
            lineHeight={7}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  border:
                    selectedId === item.id && edited !== item.id
                      ? "1px solid black"
                      : ""
                }}
              >
                {edited !== item.id ? (
                  <p
                    style={{ width: 100 }}
                    onClick={() => handleSelectNode(item.id)}
                  >
                    {item.name}
                  </p>
                ) : (
                  <input
                    style={{ width: 100 }}
                    value={item.name}
                    onChange={e => handleTitleChange(e, item.id)}
                  />
                )}
              </div>
              <Button
                icon={edited === item.id ? "save" : "edit"}
                type="primary"
                onClick={() => handleClickEdit(item.id)}
              />
              <Button
                icon="delete"
                type="danger"
                onClick={() => handleDeleteNode(item.id)}
              />
            </div>
          </TreeNode>
        ))}
      </div>
    </div>
  );
});
