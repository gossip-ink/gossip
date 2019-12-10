import styles from "./index.css";
import { connect } from "dva";
import { Button } from "antd";
import TreeNode from "../../components/Tree/index";
import { useState } from "react";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components
  }),
  {
    addNode: (father, value) => ({ type: "slides/addNode", payload: { father, value } })
  }
)(function({ height, structure, components, addNode }) {
  const [edited, setEdited] = useState(null);
  const [selected, setSelected] = useState(1);

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
      if (node.children) {
        node.children.forEach(element => {
          dfs(element);
        });
      }
      index--;
    }
    dfs(structure);
    return nodes;
  }

  function handleAdd(e) {
    const input = document.getElementById("node-input");
    const value = input.value;
    if (value === "") {
      alert("不能为空");
      return;
    }
    addNode(selected, name);
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
          icon="plus-circle"
          shape="circle"
          onClick={handleAdd}
        />
      </div>
      <div>
        {nodes.map((item, index) => (
          <TreeNode
            node={item}
            key={index}
            marginLeft={item.marginLeft}
            selected={selected === item.id}
            setSelected={setSelected}
            edited={edited === item.id}
            setEdited={setEdited}
          />
        ))}
      </div>
    </div>
  );
});
