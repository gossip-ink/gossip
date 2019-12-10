import { useState } from "react";
import { Button } from "antd";
import { connect } from "dva";

export default connect(null, {
  updateNodeValue: (id, value) => ({
    type: "slides/updateNodeValue",
    payload: { id, value }
  }),
  deleteNode: id => ({ type: "slides/deleteNode", payload: { id } })
})(function({
  node,
  marginLeft,
  updateNodeValue,
  deleteNode,
  selected,
  setSelected,
  edited,
  setEdited
}) {
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
  }

  function handleClick(e) {
    if (edited) {
      setEdited(null);
    } else {
      setEdited(node.id);
      setSelected(node.id);
    }
  }

  return (
    <div style={{ display: "flex", marginLeft }}>
      <div
        style={{ border: selected && !edited ? "1px solid black" : "" }}
        onClick={handleSelect}
      >
        {!edited ? (
          <p style={{ width: 100 }}>{node.name}</p>
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
  );
});
