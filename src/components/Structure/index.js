import classNames from "./index.css";
import { connect } from "dva";
import { Icon, Button } from "antd";
import Node from "../Node";
import TreeNode from "../TreeNode";
import Box from "../Box";

import tree from "../../utils/tree";

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
    }),
    handleAddCmp: (type, method) => ({
      type: "slides/createCmp",
      payload: { type, method }
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
  appendCmp,
  handleAddCmp
}) {
  // 找到对应的 componnet
  const slide = components.find(item => item.id === selectedId);
  const nodes = tree(slide),
    indent = 20;

  const styles = {
    treeNode: node => ({
      paddingLeft: node.depth * indent
    })
  };

  const iconByType = {
    image: <Icon type="picture" />,
    canvas: <Icon type="codepen" />,
    text: <Icon type="font-size" />,
    panel: <Icon type="container" />
  };

  const items = [
    { title: "文字", type: "font-size", value: "text" },
    { title: "图片", type: "picture", value: "image" },
    { title: "画布", type: "codepen", value: "canvas" },
    { title: "容器", type: "container", value: "panel" }
  ];

  const contentByType = item => {
    const map = {
      image: <img src={item.value} style={{ maxHeight: "2em" }} />,
      canvas: <div>{item.value.slice(0, 10) + "..."}</div>,
      text: <div>{item.value.slice(0, 10)}</div>,
      panel: <div>{item.value || "row"}</div>
    };
    return map[item.type];
  };

  const content = (
    <ul className={classNames.list}>
      {items.map(item => (
        <li key={item.title} className={classNames.line}>
          <Icon type={item.type} className={classNames.lineIcon} />
          <span className={classNames.title}>{item.title}</span>
        </li>
      ))}
    </ul>
  );

  const contentWidthButtons = (
    <ul className={classNames.list}>
      {items.map(item => (
        <li key={item.title} className={classNames.lineWidthButton}>
          <Icon type={item.type} />
          <span className={classNames.title}>{item.title}</span>
          <div>
            <Button
              icon="down"
              onClick={() => handleAddCmp(item.value, "brother")}
            />
            <Button
              icon="right"
              onClick={() => handleAddCmp(item.value, "children")}
            />
          </div>
        </li>
      ))}
    </ul>
  );

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
    <Box height={height} title="结构" iconType="apartment">
      {nodes.map(item => (
        <TreeNode
          key={item.id}
          node={item}
          onNodeDrop={handleNodeDrop}
          highlightColor="#4091f7"
          style={styles.treeNode(item)}
          width="200px"
        >
          <Node
            onDelete={() => deleteCmp(selectedId, item.id)}
            highlight={selectedComponentId === item.id}
            height="2em"
            width="200px"
            type="add"
            popover={
              item.type === "panel" && item.depth
                ? contentWidthButtons
                : content
            }
            onAdd={() => setSelectedComp(item.id)}
          >
            <div
              className={classNames.item}
              onClick={() => setSelectedComp(item.id)}
            >
              <span className={classNames.icon}>{iconByType[item.type]}</span>
              {contentByType(item)}
            </div>
          </Node>
        </TreeNode>
      ))}
    </Box>
  );
});
