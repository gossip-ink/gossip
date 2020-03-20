import EditableText from "../EditableText/index";
import EditableImg from "../EditableImg";
import EditableCanvas from "../EditableCanvas/index";
import { connect } from "dva";
import classNames from "./index.css";
import { useRef, useEffect, useState } from "react";

const Panel = connect(
  state => ({
    selectedRootId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId,
    variables: state.slides.attributeVars,
    dragId: state.global.dragId,
    enterId: state.global.enterId,
    hoveredId: state.global.hoveredId,
    scale: state.global.scale
  }),
  {
    injectIdea: (ideaId, id, rootId) => ({
      type: "slides/injectIdea",
      payload: { ideaId, id, rootId }
    }),
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    setValueOfCmp: (value, cmpId, rootId) => ({
      type: "slides/setValueOfCmp",
      payload: { value, cmpId, rootId }
    }),
    setDrag: id => ({ type: "global/setDrag", payload: { id } }),
    setEnter: id => ({ type: "global/setEnter", payload: { id } }),
    setHovered: id => ({ type: "global/setHovered", payload: { id } }),
    exchangeCmp: (a, b, root) => ({
      type: "slides/exchangeCmp",
      payload: { a, b, root }
    }),
    deleteCmp: (rootId, id) => ({
      type: "slides/deleteCmp",
      payload: { rootId, id }
    })
  }
)(function({
  type,
  children,
  attrs,
  height,
  width,
  value,
  rootId,
  selectedRootId,
  selectedComponentId,
  id,
  setSelectedComp,
  variables,
  setValueOfCmp,
  editable,
  dragId,
  setDrag,
  exchangeCmp,
  enterId,
  setEnter,
  scale,
  hoveredId,
  setHovered,
  injectIdea
}) {
  // 处理一下 attribute
  const newAttrs = { ...attrs };
  Object.keys(newAttrs).forEach(key => {
    const value = newAttrs[key];
    if (typeof value === "string" && value[0] === "$") {
      const id = parseInt(value.slice(1));
      const v = variables.find(item => item.id === id);
      newAttrs[key] = v ? v.value : "";
    }
  });

  let content;
  const padding = newAttrs.padding;
  const outerWidth = width - padding * 2,
    outerHeight = height - padding * 2;

  const props = {
    id,
    attrs: newAttrs,
    width: outerWidth,
    height: outerHeight,
    value: value,
    select: id === selectedComponentId,
    onValueChange: value =>
      setValueOfCmp(value, selectedComponentId, selectedRootId),
    editable
  };

  if (type === "text") {
    content = <EditableText {...props} />;
  } else if (type === "image") {
    content = <EditableImg {...props} />;
  } else if (type === "canvas") {
    content = <EditableCanvas {...props} />;
  } else if (type === "panel") {
    content = (
      <>
        {children &&
          children.map((item, index) => {
            // 计算比例
            const { span } = attrs ||
              attrs.span || {
                span: children.map(() => 1)
              };
            const total = span.reduce((total, cur) => total + cur, 0);
            let pWidth, pHeight;

            if (attrs.flex === "row") {
              pWidth = (span[index] * outerWidth) / total;
              pHeight = outerHeight;
            } else {
              pHeight = (span[index] * outerHeight) / total;
              pWidth = outerWidth;
            }
            return (
              <Panel
                {...item}
                id={item.id}
                key={item.id}
                height={pHeight}
                width={pWidth}
                rootId={rootId}
                editable={editable}
              />
            );
          })}
      </>
    );
  }

  const selected = selectedRootId === rootId && id === selectedComponentId;
  const styles = {
    container: {
      display: type === "panel" && "flex",
      flexDirection: type === "panel" && attrs.flex,
      height: height && height,
      width: width && width,
      outline:
        (selected && dragId === -1 && hoveredId === -1 && editable) ||
        (enterId === id && dragId !== id && editable) ||
        (editable && hoveredId === id)
          ? "2px solid #4091f7"
          : "",
      padding
    }
  };
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleSelect(e) {
    editable && e.stopPropagation();
    editable && setSelectedComp(id);
  }

  function handleMouseup(e) {
    if (dragId !== -1 && enterId !== id && dragId !== enterId)
      exchangeCmp(dragId, enterId, rootId);
    setDrag(-1);
    setEnter(-1);
    e.stopPropagation();
  }

  function handleDrop(e) {
    const dragData = e.dataTransfer.getData("drag");
    const [dragType, data] = dragData && dragData.split("-");
    if (dragType === "idea") {
      const i = parseInt(data);
      const dragId = isNaN(i) ? data : i;
      injectIdea(dragId, id, rootId);
    }
    setHovered(-1);
    e.stopPropagation();
  }

  function handleMousemove(e) {
    // 这个函数尤其要注意，不能所有的 panel 都调用，否者很蛋疼
    if (dragId !== id || !editable) return;
    const { left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    setPos({
      x: (clientX - left) / scale + 20,
      y: (clientY - top) / scale + 20
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMousemove);
    return () => window.removeEventListener("mousemove", handleMousemove);
  });

  return (
    <div
      style={styles.container}
      onClick={handleSelect}
      onDragEnter={e => {
        setHovered(id);
        e.stopPropagation();
      }}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className={classNames.container}
      onMouseUpCapture={handleMouseup}
      onMouseEnter={() => {
        if (dragId === -1) return;
        if (enterId !== id) setEnter(id);
      }}
      onDragStart={e => {
        if (editable) setDrag(id);
        e.preventDefault();
        e.stopPropagation();
      }}
      draggable
      ref={ref}
    >
      {editable && dragId === id && (
        <div className={classNames.box} style={{ left: pos.x, top: pos.y }}>
          {content}
        </div>
      )}
      {content}
    </div>
  );
});

export default Panel;
