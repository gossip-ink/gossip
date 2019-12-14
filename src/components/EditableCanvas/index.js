import { useEffect, useState } from "react";

export default function({ attrs, value, width, height, edit, onValueChange}) {
  const canvasId = new Date().getTime() + Math.floor(Math.random() * 1000);
  const [error, setError] = useState(false);
  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
    setError(false);
  }
  useEffect(() => {
    if (error || edit) {
      // 如果有问题或者在编辑模式就不执行
      return;
    }
    try {
      const canvas = document.getElementById(canvasId);
      // 设置 canvas
      canvas.width = width * 2;
      canvas.height = height * 2;

      // 这里必须要加 px
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // 获得上下文对象
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);

      // 执行代码
      const code = `(${value})(ctx, ${width}, ${height})`;
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
        <canvas id={canvasId} style={attrs} />
      )}
    </div>
  );
}
