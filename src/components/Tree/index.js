import { Button } from "antd";
import { connect } from "dva";
import { useState } from "react";

export default connect(null, {
  updateNodeValue: (id, value) => ({
    type: "slides/updateNodeValue",
    payload: { id, value }
  }),
  deleteNode: id => ({ type: "slides/deleteNode", payload: { id } }),
  insertNode: (id, brother) => ({
    type: "slides/insertNode",
    payload: { id, brother }
  }),
  appendNode: (id, father, head = false) => ({
    type: "slides/appendNode",
    payload: { id, father, head}
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
  const [overed, setOverd] = useState(false);
  const [inserted, setInserted] = useState(false);
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

  function handleDrop(e) {
    setOverd(false);
    setDragged(false);
    const dragNode = e.dataTransfer.getData("dragNode");
    parseInt(dragNode) !== node.id && appendNode(parseInt(dragNode), node.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(e) {
    setDragged(true);
    e.dataTransfer.setData("dragNode", node.id);
  }

  function handleDragEnter(e) {
    !dragged && setOverd(true);
  }

  function handleDragLeave(e) {
    setOverd(false);
  }

  function handleLineDragEnter(e) {
    setInserted(true);
  }

  function handleLineDragLeave(e) {
    setInserted(false);
  }

  function handleLineDragOver(e) {
    e.preventDefault();
  }

  function handleLineDrop(e) {
    setDragged(false);
    setInserted(false);
    const dragNode = e.dataTransfer.getData("dragNode");

    if (parseInt(dragNode) === node.id) {
      return;
    }
    if (node.children && node.children.length > 0) {
      // 如果有孩子，就插入孩子的第一个
      appendNode(parseInt(dragNode), node.id, true);
    } else {

      // 如果没有孩子，就作为下一个兄弟节点
      insertNode(parseInt(dragNode), node.id);
    }
  }

  return (
    <div>
      <div
        style={{ display: "flex", marginLeft }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        draggable
      >
        <div
          style={{
            border: selected && !edited ? "1px solid black" : "",
            background: overed && "red"
          }}
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
        <div>
          <Button
            icon={edited ? "save" : "edit"}
            type="primary"
            onClick={handleClick}
          />
          <Button icon="delete" type="danger" onClick={handleDelete} />
        </div>
      </div>
      <div
        style={{ background: inserted && "red", height: 10 }}
        onDragEnter={handleLineDragEnter}
        onDragLeave={handleLineDragLeave}
        onDragOver={handleLineDragOver}
        onDrop={handleLineDrop}
      ></div>
    </div>
  );
});
