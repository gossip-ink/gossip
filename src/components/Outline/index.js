import styles from "./index.css";
import { connect } from "dva";
import { Button } from "antd";
import TreeNode from "../../components/TreeNode/index";
import { useEffect, useState } from "react";

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
  setSelectedPanel
}) {
  function getNodes() {
    // 布局，并且获得 name
    const nodes = [];
    let index = -1;
    const indent = 15;
    function dfs(node) {
      const treeNode = {
        ...node,
        marginLeft: ++index * indent
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

  function dfs(node, cb) {
    cb(node);
    node.children && node.children.forEach(item => dfs(item, cb));
  }

  function handleCreateNode(type) {
    const input = document.getElementById("node-input");
    const value = input.value;
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

  const [edit, setEdit] = useState(false);

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
    if (selectedPanel === 0 ) {
      window.addEventListener("keydown", keydown);
    }

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  });

  const nodes = getNodes();

  return (
    <div
      style={{
        height,
        border: selectedPanel === 0 && "1px solid black"
      }}
      className={styles.container}
      onClick={() => setSelectedPanel(0)}
    >
      <h1>Outline</h1>
      <div>
        <input id="node-input"></input>
        <Button
          type="primary"
          icon="down"
          shape="circle"
          onClick={() => handleCreateNode("brother")}
          disabled={selectedId === 1}
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
              <div>
                {selectedId !== item.id ? (
                  <p
                    style={{ width: 100 }}
                    onClick={() => handleSelectNode(item.id)}
                  >
                    {item.name === "" ? "未编辑" : item.name}
                  </p>
                ) : (
                  <input
                    style={{ width: 100 }}
                    value={item.name}
                    onChange={e => handleTitleChange(e, item.id)}
                    onClick={e => setEdit(true)}
                    onBlur={e => setEdit(false)}
                  />
                )}
              </div>
              {item.id !== 1 && (
                <Button
                  icon="delete"
                  type="danger"
                  onClick={() => handleDeleteNode(item.id)}
                />
              )}
            </div>
          </TreeNode>
        ))}
      </div>
    </div>
  );
});
