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
    const container = document.getElementById(id);
    let max = 100;
    let fontSize = attrs.fontSize;

    while (container.offsetHeight > height && max > 0) {
      max -= 1;
      fontSize -= 10;
      container.style.fontSize = `${fontSize}px`;
    }
    max !== 100 && changeAttr(fontSize, "fontSize");
  });
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {edit ? (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          rows={value.split("\n").length}
          style={{
            ...attrs,
            backgroundColor: "transparent",
            border: 0,
            resize: "none",
            outline: "none",
            textAlign: "center"
          }}
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            ...attrs
          }}
        >
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
