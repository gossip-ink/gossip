import { Button } from "antd";
import { connect } from "dva";
import { useState } from "react";

export default connect(null, {
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
})(function({
  node,
  marginLeft,
  updateNodeValue,
  deleteNode,
  selected,
  setSelected,
  edited,
  setEdited,
  insertNode,
  appendNode
}) {
  const [middle, setMiddle] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [top, setTop] = useState(false);
  const [dragged, setDragged] = useState(false);

  function handleChange(e) {
    const value = e.target.value,
      id = node.id;
    updateNodeValue(id, value);
  }

  function handleDelete(e) {
    const id = node.id;
    deleteNode(id);
  }

  function handleSelect(e) {
    setSelected(node.id);
    setEdited(null);
  }

  function handleClick(e) {
    if (edited) {
      setEdited(null);
    } else {
      setEdited(node.id);
      setSelected(node.id);
    }
  }

  function handleDrop(e, type) {
    // 清除状态
    setDragged(false);
    setMiddle(false);
    setTop(false);
    setBottom(false);

    // 获得拖拽的节点
    const dragNode = parseInt(e.dataTransfer.getData("dragNode"));
    if (dragNode === node.id) {
      return;
    }

    if (type === "top") {
      insertNode(dragNode, node.id, true);
    } else if (type === "middle") {
      appendNode(dragNode, node.id);
    } else if (type === "bottom") {
      insertNode(dragNode, node.id);
    }
  }

  function handleDragStart(e) {
    setDragged(true);
    e.dataTransfer.setData("dragNode", node.id);
  }

  return (
    <div style={{ marginLeft }}>
      <div
        style={{ background: top && "red", height: 10 }}
        onDragEnter={() => !dragged && setTop(true)}
        onDragLeave={() => setTop(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, "top")}
      ></div>
      <div
        onDrop={e => handleDrop(e, "middle")}
        onDragOver={e => e.preventDefault()}
        onDragEnter={() => !dragged && setMiddle(true)}
        onDragLeave={() => setMiddle(false)}
        onDragStart={handleDragStart}
        draggable
      >
        <div
          style={{
            background: middle && "red"
          }}
        >
          <div
            style={{display: "flex"}}
          >
            <div
              style={{ border: selected && !edited ? "1px solid black" : "" }}
            >
              {!edited ? (
                <p style={{ width: 100 }} onClick={handleSelect}>
                  {node.name}
                </p>
              ) : (
                <input
                  style={{ width: 100 }}
                  value={node.name}
                  onChange={handleChange}
                />
              )}
            </div>
            <Button
              icon={edited ? "save" : "edit"}
              type="primary"
              onClick={handleClick}
            />
            <Button icon="delete" type="danger" onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div
        style={{ background: bottom && "red", height: 10 }}
        onDragEnter={() => !dragged && setBottom(true)}
        onDragLeave={() => setBottom(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, "bottom")}
      ></div>
    </div>
  );
});
