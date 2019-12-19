import { useEffect, useState } from "react";

export default function({ attrs, value, width, height, edit, onValueChange }) {
  // 让 outline 和 maincontent 中的不同
  const canvasId = new Date().getTime() + Math.floor(Math.random() * 1000);
  
  const [error, setError] = useState(false);
  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
    setError(false);
  }

  const boxWidth = width - attrs.padding * 2,
    boxHeight = height - attrs.padding * 2;
  useEffect(() => {
    if (error || edit) {
      // 如果有问题或者在编辑模式就不执行
      return;
    }
    try {
      const canvas = document.getElementById(canvasId);
      // 设置 canvas
      canvas.width = boxWidth * 2;
      canvas.height = boxHeight * 2;

      // 这里必须要加 px
      canvas.style.width = boxWidth + "px";
      canvas.style.height = boxHeight + "px";

      // 获得上下文对象
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);

      // 执行代码
      const code = `(${value})(canvas, ctx, ${boxWidth}, ${boxHeight})`;
      eval(code);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  });

  return (
    <div>
      {edit ? (
        <textarea
          value={value}
          onChange={handleChange}
          style={{
            height: height * 0.8,
            width,
            backgroundColor: "transparent",
            border: 0,
            resize: "none",
            outline: "none"
          }}
        />
      ) : error ? (
        <p>出错啦~</p>
      ) : (
        <canvas id={canvasId} style={{
          margin: attrs.padding
        }} />
      )}
    </div>
  );
}
