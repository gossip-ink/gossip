import { useState } from "react";
import { Icon, Button } from "antd";
export default function({
  children,
  onVarDrop,
  isVar,
  onVarDelete,
  onVarSelect
}) {
  const [hoverd, setHoverd] = useState(false);

  function handleDrop(e) {
    setHoverd(false);
    const type = e.dataTransfer.getData("type"),
      id = parseInt(e.dataTransfer.getData("id"));
    onVarDrop && onVarDrop(type, id);
  }

  function handleDeleteVar() {
    onVarDelete && onVarDelete();
  }

  function handleSelectVar() {
    onVarSelect && onVarSelect();
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
      >
        {isVar && (
          <>
            <Button icon="eye" type="primary" onClick={handleSelectVar} />
            <Button icon="delete" type="danger" onClick={handleDeleteVar} />
          </>
        )}
      </div>
    </div>
  );
}
