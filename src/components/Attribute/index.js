import { useState } from "react";
import { Icon, Button } from "antd";
export default function({ children, onVarDrop, isVar, onVarDelete }) {
  const [hoverd, setHoverd] = useState(false);
  const [star, setStar] = useState(true);

  function handleDrop(e) {
    setHoverd(false);
    const type = e.dataTransfer.getData("type"),
      id = parseInt(e.dataTransfer.getData("id"));
    onVarDrop && onVarDrop(type, id);
  }

  function handleDeleteVar(){
    onVarDelete && onVarDelete();
  }

  return (
    <div
      style={{
        background: hoverd && "red",
        display: "flex"
      }}
      onDragEnter={() => setHoverd(true)}
      onDragLeave={() => setHoverd(false)}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div>{children}</div>
      <div
        style={{
          marginLeft: 10
        }}
        onMouseEnter={() => setStar(false)}
        onMouseOut={() => setStar(true)}
        onMouseOver={() => setStar(false)}
      >
        {isVar &&
          (star ? (
            <Icon type="star" />
          ) : (
            <Button icon="delete" type="danger" onClick={handleDeleteVar}/>
          ))}
      </div>
    </div>
  );
}
