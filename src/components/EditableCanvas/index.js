import { useEffect, useState, useRef } from "react";
import { Button, Result } from "antd";
import classNames from "./index.css";
import { connect } from "dva";

export default connect(({ global }) => ({
  locales: global.locales,
  lang: global.lang,
}))(function({ value, width, height, select, onValueChange, locales, lang }) {
  const ref = useRef(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const styles = {
    input: {
      height,
      width,
    },
    canvas: {
      height,
      width,
    },
    container: {
      height,
      width,
    },
    error: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function handleChange(e) {
    const value = e.target.value;
    onValueChange && onValueChange(value);
    setError(false);
  }

  useEffect(
    () => {
      if (error || edit) return;
      try {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.scale(2, 2);
        // 执行代码
        const code = `(${value})(canvas, ctx, ${width}, ${height})`;
        const timer = eval(code);
        return () => timer && clearInterval(timer);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    },
    [value, edit, width, height]
  );

  return (
    <div
      className={classNames.container}
      style={styles.container}
      onMouseLeave={() => setEdit(false)}
    >
      {select && (
        <Button
          icon={edit ? "save" : "edit"}
          className={classNames.btn}
          type="primary"
          onClick={() => setEdit(!edit)}
        />
      )}
      {edit && select ? (
        <textarea
          value={value}
          onChange={handleChange}
          clasName={classNames.input}
          style={styles.input}
        />
      ) : error ? (
        <Result
          status="error"
          title={locales.RUNTIME_ERROR[lang]}
          subTitle={locales.TRY_DEBUG[lang]}
          style={styles.error}
        />
      ) : (
        <canvas
          ref={ref}
          style={styles.canvas}
          width={width * 2}
          height={height * 2}
        />
      )}
    </div>
  );
});
