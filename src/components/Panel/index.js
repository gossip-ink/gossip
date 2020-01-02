import EditableText from "../EditableText/index";
import EditableImg from "../EditableImg";
import EditableCanvas from "../EditableCanvas/index";
import { connect } from "dva";

const Panel = connect(
  state => ({
    selectedRootId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId,
    variables: state.slides.attributeVars
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    setValueOfCmp: (value, cmpId, rootId) => ({
      type: "slides/setValueOfCmp",
      payload: { value, cmpId, rootId }
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
}) {
  // 处理一下 attribute
  const newAttrs = { ...attrs };
  Object.keys(newAttrs).forEach(key => {
    const value = newAttrs[key];
    if (typeof value === "string" && value[0] === "$") {
      const id = parseInt(value.slice(1));
      const v = variables.find(item => item.id === id);
      newAttrs[key] = v.value;
    }
  });

  function handleValueChange(value) {
    setValueOfCmp(value, selectedComponentId, selectedRootId);
  }

  let content;
  const padding = newAttrs.padding;
  const outerWidth = width - padding * 2,
    outerHeight = height - padding * 2;

  const props = {
    attrs: newAttrs,
    width: outerWidth,
    height: outerHeight,
    value: value,
    edit: id === selectedComponentId,
    onValueChange: handleValueChange,
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

  function handleSelect(e) {
    editable && e.stopPropagation();
    editable && setSelectedComp(id);
  }

  const selected = selectedRootId === rootId && id === selectedComponentId;

  const style = {
    display: type === "panel" && "flex",
    flexDirection: type === "panel" && attrs.flex,
    height: height && height,
    width: width && width,
    border: selected && "1px solid black",
    padding
  };

  return (
    <div style={style} onClick={handleSelect}>
      {content}
    </div>
  );
});

export default Panel;
