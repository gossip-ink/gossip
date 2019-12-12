import { useState } from "react";

export default function({
  node,
  marginLeft,
  children,
  onNodeDrop,
  highlightColor,
  lineHeight,
}) {
  const [middle, setMiddle] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [top, setTop] = useState(false);
  const [dragged, setDragged] = useState(false);

  function handleDrop(e, type) {
    // 清除状态
    setDragged(false);
    setMiddle(false);
    setTop(false);
    setBottom(false);

    // 获得拖拽的节点
    const data = parseInt(e.dataTransfer.getData("dragNode"));
    const dragNode = isNaN(data) ? e.dataTransfer.getData("dragNode"): data;
    if (dragNode === node.id) {
      return;
    }

    // 执行相应的数据变化
    onNodeDrop(dragNode, node.id, type);
  }

  function handleDragStart(e) {
    setDragged(true);
    e.dataTransfer.setData("dragNode", node.id);
  }

  return (
    <div style={{ marginLeft }}>
      <div
        style={{ background: top && highlightColor, height: lineHeight }}
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
            background: middle && highlightColor
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{ background: bottom && highlightColor, height: lineHeight }}
        onDragEnter={() => !dragged && setBottom(true)}
        onDragLeave={() => setBottom(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, "bottom")}
      ></div>
    </div>
  );
}
