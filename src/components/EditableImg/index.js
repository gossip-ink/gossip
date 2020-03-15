import { useState } from "react";
import classNames from "./index.css";
import Input from "../Input";

export default function({
  attrs,
  value,
  width,
  height,
  select,
  onValueChange,
  editable
}) {
  const [edit, setEdit] = useState(false);

  const styles = {
    container: {
      width,
      height,
      cursor: !edit && editable && "move"
    },
    normal: {
      maxHeight: height,
      maxWidth: width
    },
    fill: {
      height,
      width
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
