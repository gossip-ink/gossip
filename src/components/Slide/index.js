import styles from "./index.css";
import Panel from "../Panel/index";
import { useState } from "react";
import { connect } from "dva";
export default connect(null, {
  appendIdea: (ideaId, nodeId) => ({
    type: "slides/appendIdea",
    payload: { nodeId, ideaId }
  })
})(function({
  height = screen.height,
  width = screen.width,
  scale = 1,
  translateX = 0,
  translateY = 0,
  content,
  selected,
  hasBackground = true,
  editable = false,
  isDrag = false,
  setIsDrag,
  appendIdea
}) {
  const style = {
    height,
    width,
    transform: `translate(${translateX}px,${translateY}px) scale(${scale})`,
    border: selected && "10px solid black"
  };

  const [dragged, setDragged] = useState(false);
  const { id } = content;

  function handleDrop(e) {
    const dragType = e.dataTransfer.getData("type");
    if (dragType !== "idea") return;
    const dragId = parseInt(e.dataTransfer.getData("id"));
    appendIdea(dragId, content.id);
    setIsDrag(false);
  }

  return (
    <div
      className={`${styles.container} ${hasBackground && styles.background}`}
      style={style}
    >
      {/* 拖拽时形成的遮盖层 */}
      {isDrag && (
        <div
          onDragEnter={() => setDragged(true)}
          onDragLeave={() => setDragged(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            height,
            width,
            backgroundColor: "red",
            position: "absolute",
            opacity: dragged ? 0.5 : 0
          }}
        ></div>
      )}

      <Panel
        {...content}
        height={height}
        width={width}
        rootId={id}
        editable={editable}
      />
    </div>
  );
});
