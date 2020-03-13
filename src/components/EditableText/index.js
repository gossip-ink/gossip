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

  const fontStyles = {
    fontSize: attrs.fontSize,
    color: attrs.color,
    textAlign: attrs.textAlign,
    paddingLeft: attrs.padding,
    paddingRight: attrs.padding,
    fontWeight: attrs.fontWeight
  };

  function handleChange(e) {
    // // 判断是否需要换行
    // console.log(e);
    // const input = ref.current;
    // const value = e.target.value;
    // console.log(value, value.split("\n"));
    // onValueChange && onValueChange(value);
  }

  function handleMoveLeave() {
    const input = ref.current;
    if (input) {
      const text = input.innerText || input.textContent;
    }
    setEdit(false);
  }

  useEffect(() => {
    // // 防止文字过大
    // if (!edit) return;
    // // 获得容器
    // const container = ref.current;
    // let flag = 100;
    // let fontSize = attrs.fontSize;
    // // 不断调整大小
    // while (container.offsetHeight > height && flag > 0) {
    //   flag -= 1;
    //   fontSize -= 10;
    //   container.style.fontSize = `${fontSize}px`;
    // }
    // flag !== 100 && changeAttr(fontSize, "fontSize");
  });

  return (
    <div
      style={{
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
      }}
      onClick={() => setEdit(true)}
      onMouseLeave={handleMoveLeave}
    >
      {edit && select ? (
        // <textarea
        //   ref={ref}
        //   value={value}
        //   onChange={handleChange}
        //   rows={value.split("\n").length}
        //   wrap="hard"
        //   cols={1}
        //   className={classNames.textInput}
        //
        // />
        <div contentEditable="true" style={{ width, ...fontStyles }} ref={ref}>
          {value}
        </div>
      ) : (
        <div style={fontStyles} className={classNames.text}>
          {value.split("\n").map((line, index) => (
            <p key={index} style={{ margin: "0em" }}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});
