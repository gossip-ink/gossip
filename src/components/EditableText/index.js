import { useEffect, useState, useRef } from "react";
import { connect } from "dva";
import classNames from "./index.css";

export default connect(null, {
  changeAttr: (value, key, cmpId, rootId) => ({
    type: "slides/changeAttr",
    payload: { value, key, cmpId, rootId }
  })
})(function({
  id,
  attrs,
  value,
  width,
  height,
  select,
  onValueChange,
  changeAttr,
  editable
}) {
  const [edit, setEdit] = useState(false);
  const ref = useRef(null);
  const lines = value.split("\n").map(l => {
    if (l[0] !== "-") return l;
    if (l.length >= 2 && l[1] === " ") {
      const chars = l.split("");
      chars[0] = "•";
      return chars.join("");
    }
  });

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
      fontWeight: attrs.fontWeight,
      cursor: editable && "move"
    },
    line: {
      width
    }
  };

  function whitespace(str) {
    let cnt = 0;
    while (cnt < str.length && str[cnt] === " ") cnt++;
    return cnt / 4;
  }

  function autoSize() {
    const input = ref.current;
    let ft = attrs.fontSize;
    // offsetHeight 是没有进行缩放后的高度，和 getBoundClientRect 获取的值不一样
    let bh = input.offsetHeight;
    // 这里必须要将 style 的 height 设置为 0， 否则 offsetHeight 就不会变了
    input.style.height = "";
    while (height < bh && ft > 0) {
      ft -= 5;
      input.style.fontSize = `${ft}px`;
      bh = input.offsetHeight;
    }
    if (ft !== attrs.fontSize) changeAttr(ft, "fontSize", id);
    // textarea 高度自适应
    if (select && edit) input.style.height = input.scrollHeight + "px";
  }

  useEffect(() => {
    autoSize();
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
          onChange={e => onValueChange(e.target.value)}
          rows={lines.length}
          className={classNames.textInput}
          style={{ width, ...styles.font }}
          wrap="hard"
        />
      ) : (
        <div style={styles.font} ref={ref}>
          {lines.map((line, index) =>
            line === "" ? (
              <br key={index} />
            ) : (
              <p
                key={index}
                className={classNames.line}
                style={{
                  width,
                  textIndent: `${whitespace(line)}em`
                }}
              >
                {line}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
});
