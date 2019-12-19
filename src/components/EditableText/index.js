import { useEffect } from "react";
import { connect } from "dva";

export default connect(null, {
  changeAttr: (value, key, cmpId, rootId) => ({
    type: "slides/changeAttr",
    payload: { value, key, cmpId, rootId }
  })
})(function({ attrs, value, width, height, edit, onValueChange, changeAttr }) {
  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
  }

  const id = "text" + new Date().getTime();

  useEffect(() => {
    // 防止文字过大
    if (!edit) return;

    // 获得容器
    const container = document.getElementById(id);
    let flag = 100;
    let fontSize = attrs.fontSize;

    // 不断调整大小
    while (container.offsetHeight > height && flag > 0) {
      flag -= 1;
      fontSize -= 10;
      container.style.fontSize = `${fontSize}px`;
    }
    flag !== 100 && changeAttr(fontSize, "fontSize");
  });

  const fontStyles = {
    fontSize: attrs.fontSize,
    color: attrs.color,
    textAlign: attrs.textAlign,
    paddingLeft: attrs.padding,
    paddingRight: attrs.padding,
    fontWeight: attrs.fontWeight
  };

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: // 竖直居中
          attrs.verticalAlign === "center"
            ? "center"
            : attrs.verticalAlign === "bottom"
            ? "flex-end"
            : "flex-start",
        justifyContent: //水平居中
          attrs.textAlign === "center"
            ? "center"
            : attrs.textAlign === "right"
            ? "flex-end"
            : "flex-start"
      }}
    >
      {edit ? (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          rows={value.split("\n").length}
          style={{
            backgroundColor: "transparent",
            border: 0,
            resize: "none",
            outline: "none",
            width,
            ...fontStyles
          }}
        />
      ) : (
        <div style={fontStyles}>
          {value.split("\n").map((line, index) => (
            // 设置 margin 为 0 行
            <p key={index} style={{ margin: "0em" }}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});
