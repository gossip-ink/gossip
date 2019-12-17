import styles from "./index.css";
import { connect } from "dva";
import TreeNode from "../../components/TreeNode/index";
import CmpBar from "../../components/CmpBar/index";
import { Icon, Button } from "antd";
export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    deleteCmp: (rootId, id) => ({
      type: "slides/deleteCmp",
      payload: { rootId, id }
    }),
    insertCmp: (id, brother, rootId, before = false) => ({
      type: "slides/insertCmp",
      payload: { id, brother, rootId, before }
    }),
    appendCmp: (id, father, rootId) => ({
      type: "slides/appendCmp",
      payload: { id, father, rootId }
    })
  }
)(function({
  height,
  components,
  selectedId,
  selectedComponentId,
  setSelectedComp,
  deleteCmp,
  insertCmp,
  appendCmp
}) {
  // 找到对应的 componnet
  const slide = components.find(item => item.id === selectedId);

  // 布局
  let index = 0;
  const nodes = [],
    indent = 20;
  function dfs(node) {
    nodes.push({
      ...node,
      marginLeft: ++index * indent
    });
    node.children && node.children.forEach(item => dfs(item));
    index--;
  }
  dfs(slide);

  const iconByType = {
    image: <Icon type="picture" />,
    canvas: <Icon type="codepen" />,
    text: <Icon type="font-size" />,
    panel: <Icon type="container" />
  };

  const contentByType = function(item) {
    const mp = {
      image: <img src={item.value} width={50} />,
      canvas: <div>{item.value.slice(0, 10) + "..."}</div>,
      text: <div>{item.value.slice(0, 10)}</div>,
      panel: <div>{item.value || "row"}</div>
    };
    return mp[item.type];
  };

  function handleSelect(id) {
    setSelectedComp(id);
  }

  function handleDeleteCmp(id) {
    deleteCmp(selectedId, id);
  }

  function handleNodeDrop(sourceNodeId, targetNodeId, type) {
    if (type === "top") {
      insertCmp(sourceNodeId, targetNodeId, selectedId, true);
    } else if (type === "middle") {
      const cmp = nodes.find(item => item.id === targetNodeId);
      if (cmp.type !== "panel") {
        alert("只能插入到布局节点到后面～");
        return;
      }
      appendCmp(sourceNodeId, targetNodeId, selectedId);
    } else if (type === "bottom") {
      if (targetNodeId === selectedId) {
        alert("跟节点没有兄弟");
        return;
      }
      insertCmp(sourceNodeId, targetNodeId, selectedId);
    }
  }

  return (
    <div style={{ height, overflow: "auto" }} className={styles.container}>
      <div
        style={{
          display: "flex"
        }}
      >
        <h1>Structure</h1>
        <CmpBar />
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
                  paddingRight: 10
                }}
              >
                {iconByType[item.type]}
              </div>
              <div
                style={{
                  width: 100,
                  border: selectedComponentId === item.id && "1px solid black",
                  marginRight: 10
                }}
                onClick={() => handleSelect(item.id)}
              >
                {contentByType(item)}
              </div>
              <Button
                icon="delete"
                type="danger"
                onClick={() => handleDeleteCmp(item.id)}
              />
            </div>
          </TreeNode>
        ))}
      </div>
    </div>
  );
});
