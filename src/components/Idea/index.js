import { Button, Input, Upload } from "antd";
import { connect } from "dva";
import { useState } from "react";
export default connect(null, {
  deleteIdea: id => ({ type: "slides/deleteIdea", payload: { id } }),
  saveIdea: (id, value) => ({
    type: "slides/saveIdea",
    payload: { id, value }
  })
})(function({ content, deleteIdea, saveIdea, setIsDrag }) {
  const { type, id } = content;
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(content.value);

  function handleEdit() {
    if (edit === true) {
      saveIdea(id, value);
    }
    setEdit(!edit);
  }

  function handleDelete() {
    deleteIdea(id);
  }

  function handleImageChange(data) {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageURL = reader.result;
      setValue(imageURL);
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
      style={{ display: "flex", justifyContent: "space-between", width: 250 }}
      draggable
      onDragStart={e => handleDragStart(e, content)}
      onDragEnd={e => setIsDrag(false)}
    >
      <Button icon="drag" type="primary" />
      {type === "image" ? (
        <img src={value} width={50} />
      ) : edit ? (
        <Input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ width: 150 }}
        />
      ) : (
        <div>{value.slice(0, 10)}</div>
      )}
      <div>
        {type === "image" ? (
          <Upload
            accept="image/*"
            onChange={handleImageChange}
            showUploadList={false}
            customRequest={() => {}}
          >
            <Button type="primary" icon="upload"></Button>
          </Upload>
        ) : (
          <Button
            icon={edit ? "save" : "edit"}
            type="primary"
            onClick={handleEdit}
          />
        )}
        <Button icon="delete" type="danger" onClick={handleDelete} />
      </div>
    </div>
  );
});
