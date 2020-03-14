import { useState } from "react";
import classNames from "./index.css";
import Input from "../Input";

export default function({
  attrs,
  value,
  width,
  height,
  select,
  onValueChange
}) {
  const [edit, setEdit] = useState(false);

  const boxHeight = height - attrs.padding * 2,
    boxWidth = width - attrs.padding * 2;

  const styles = {
    container: {
      width,
      height,
      cursor: !edit && "move"
    },
    normal: {
      maxHeight: boxHeight,
      maxWidth: boxWidth
    },
    fill: {
      height: boxHeight,
      width: boxWidth
    }
  };

  return (
    <div
      style={styles.container}
      onClick={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
      className={classNames.container}
    >
      <img
        draggable
        alt="图片被一阵风吹走了..."
        src={value}
        style={
          attrs.displayMode === "scaleToFill" ? styles.fill : styles.normal
        }
      />
      {edit && select && (
        <div className={classNames.btn}>
          <Input type="image" onChange={onValueChange}></Input>
        </div>
      )}
    </div>
  );
}
