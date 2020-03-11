import { useState } from "react";
import classNames from "./index.css";
export default function({
  node,
  children,
  onNodeDrop,
  highlightColor,
  width,
  style
}) {
  const [middle, setMiddle] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [top, setTop] = useState(false);
  const [dragged, setDragged] = useState(false);

  const styles = {
    container: {
      background: middle && highlightColor
    },
    top: { background: top && highlightColor, width },
    middle: { width },
    bottom: { background: bottom && highlightColor, width }
  };

  function handleDrop(e, type) {
    // 清除状态
    setDragged(false);
    setMiddle(false);
    setTop(false);
    setBottom(false);

    // 判断拖拽的类型
    const dragType = e.dataTransfer.getData("type");

    // 获得拖拽的节点
    let dragId;
    if (dragType === "node") {
      const data = parseInt(e.dataTransfer.getData("dragNode"));
      dragId = isNaN(data) ? e.dataTransfer.getData("dragNode") : data;
      if (dragId === node.id) return;
    } else {
      dragId = parseInt(e.dataTransfer.getData("id"));
    }
    onNodeDrop(dragId, node.id, type, dragType);
  }

  function handleDragStart(e) {
    setDragged(true);
    e.dataTransfer.setData("type", "node");
    e.dataTransfer.setData("dragNode", node.id);
  }

  return (
    <div style={{ ...style, ...styles.container }}>
      <div
        style={styles.top}
        className={classNames.line}
        onDragEnter={() => !dragged && setTop(true)}
        onDragLeave={() => setTop(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, "top")}
      ></div>
      <div
        style={styles.middle}
        onDrop={e => handleDrop(e, "middle")}
        onDragOver={e => {
          if (!middle) setMiddle(true);
          e.preventDefault();
        }}
        onDragLeave={() => setMiddle(false)}
        onDragStart={handleDragStart}
        draggable
      >
        {children}
      </div>
      <div
        style={styles.bottom}
        onDragEnter={() => !dragged && setBottom(true)}
        onDragLeave={() => setBottom(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, "bottom")}
        className={classNames.line}
      ></div>
    </div>
  );
}
