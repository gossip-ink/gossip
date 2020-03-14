import { useEffect, useState, useRef } from "react";
import { connect } from "dva";
import classNames from "./index.css";

export default connect(null, {
  changeAttr: (value, key, cmpId, rootId) => ({
    type: "slides/changeAttr",
    payload: { value, key, cmpId, rootId }
  })
})(function({
  attrs,
  value,
  width,
  height,
  select,
  onValueChange,
  changeAttr
}) {
  const [edit, setEdit] = useState(false);
  const ref = useRef(null);
  const lines = value.split("\n");

  const styles = {
    container: {
      width,
      height,
      display: "flex",
      // 竖直居中
      alignItems:
        attrs.verticalAlign === "center"
          ? "center"
          : attrs.verticalAlign === "bottom"
          ? "flex-end"
          : "flex-start",
      //水平居中
      justifyContent:
        attrs.textAlign === "center"
          ? "center"
          : attrs.textAlign === "right"
          ? "flex-end"
          : "flex-start"
    },
    font: {
      fontSize: attrs.fontSize,
      color: attrs.color,
      textAlign: attrs.textAlign,
      paddingLeft: attrs.padding,
      paddingRight: attrs.padding,
      fontWeight: attrs.fontWeight
    },
    line: {
      width
    }
  };

  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
  }

  useEffect(() => {
    const input = ref.current;
    let ft = attrs.fontSize;
    // offsetHeight 是没有进行缩放后的高度，和 getBoundClientRect 获取的值不一样
    let bh = input.offsetHeight;
    // 这里必须要将 style 的 height 设置为 0， 否则 offsetHeight 就不会变了
    input.style.height = "";
    while (height < bh && ft > 0) {
      ft -= 10;
      input.style.fontSize = `${ft}px`;
      bh = input.offsetHeight;
    }
    if (ft !== attrs.fontSize) changeAttr(ft, "fontSize");
    // textarea 高度自适应
    if (select && edit) input.style.height = input.scrollHeight + "px";
  });

  return (
    <div
      style={styles.container}
      onClick={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      {edit && select ? (
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          rows={lines.length}
          className={classNames.textInput}
          style={{ width, ...styles.font }}
          wrap="hard"
        />
      ) : (
        <div style={styles.font} className={classNames.text} ref={ref}>
          {lines.map((line, index) => (
            <div key={index} className={classNames.line} style={styles.line}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
