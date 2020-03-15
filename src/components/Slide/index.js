import classNames from "./index.css";
import Panel from "../Panel";
import { useState } from "react";
import { connect } from "dva";
export default connect(
  state => ({
    isDrag: state.global.isDragIdea
  }),
  {
    appendIdea: (ideaId, nodeId) => ({
      type: "slides/appendIdea",
      payload: { nodeId, ideaId }
    }),
    setIsDrag: drag => ({ type: "global/setDragIdea", payload: { drag } })
  }
)(function({
  height = screen.height,
  width = screen.width,
  content,
  selected,
  editable = false,
  isDrag = false,
  setIsDrag,
  appendIdea
}) {
  const [dragged, setDragged] = useState(false);
  const { id } = content;
  const styles = {
    container: {
      outline:
        !editable && (selected ? "10px solid #4091f7" : "10px solid #efefef"),
      height,
      width,
      transformOrigin: "left top"
    },
    overlayer: {
      height,
      width,
      backgroundColor: "#4091f7",
      position: "absolute",
      opacity: dragged ? 0.5 : 0,
      zIndex: 10
    }
  };
  function handleDrop(e) {
    const dragType = e.dataTransfer.getData("type");
    if (dragType !== "idea") return;
    const dragId = parseInt(e.dataTransfer.getData("id"));
    appendIdea(dragId, content.id);
    setIsDrag(false);
  }

  return (
    <div className={classNames.container} style={styles.container}>
      {/* 拖拽时形成的遮盖层 */}
      {isDrag && (
        <div
          onDragEnter={() => setDragged(true)}
          onDragLeave={() => setDragged(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          style={styles.overlayer}
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
