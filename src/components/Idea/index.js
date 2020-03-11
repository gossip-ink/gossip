import classNames from "./index.css";
import Node from "../Node";
import { connect } from "dva";
import { useState } from "react";
export default connect(null, {
  deleteIdea: id => ({ type: "slides/deleteIdea", payload: { id } }),
  saveIdea: (id, value) => ({
    type: "slides/saveIdea",
    payload: { id, value }
  })
})(function({ content, deleteIdea, saveIdea, setIsDrag }) {
  const { type, id, value } = content;
  const [edit, setEdit] = useState(false);

  function handleImageChange(data) {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageURL = reader.result;
      saveIdea(id, imageURL);
    };
  }

  function handleDragStart(e, item) {
    e.dataTransfer.setData("id", item.id);
    e.dataTransfer.setData("type", "idea");
    setIsDrag(true);
  }

  return (
    <div
      draggable
      onDragStart={e => handleDragStart(e, content)}
      onDragEnd={() => setIsDrag(false)}
      className={classNames.container}
    >
      <Node
        onDelete={() => deleteIdea(id)}
        onEdit={() => setEdit(!edit)}
        onImageChange={handleImageChange}
        type={type}
        width="100%"
        height="2em"
      >
        <div className={classNames.nodeTitle}>
          {type === "image" ? (
            <img src={value} className={classNames.image} />
          ) : edit ? (
            <input value={value} onChange={e => saveIdea(id, e.target.value)} />
          ) : (
            <div>{value}</div>
          )}
        </div>
      </Node>
    </div>
  );
});
