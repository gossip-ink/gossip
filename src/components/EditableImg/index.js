import { useState } from "react";
import classNames from "./index.css";
import Input from "../Input";
import { connect } from "dva";

export default connect(({ global }) => ({
  locales: global.locales,
  lang: global.lang,
}))(function({
  attrs,
  value,
  width,
  height,
  select,
  onValueChange,
  editable,
  locales,
  lang,
}) {
  const [edit, setEdit] = useState(false);
  const { textAlign, verticalAlign } = attrs;
  const styles = {
    container: {
      width,
      height,
      paddingLeft: attrs.padding,
      paddingRight: attrs.padding,
      cursor: !edit && editable && "move",
      justifyContent:
        textAlign === "left"
          ? "flex-start"
          : textAlign === "right"
          ? "flex-end"
          : "center",
      alignItems:
        verticalAlign === "top"
          ? "flex-start"
          : verticalAlign === "bottom"
          ? "flex-end"
          : "center",
    },
    normal: {
      maxHeight: height,
      maxWidth: width,
    },
    fill: {
      height,
      width,
    },
    btn: {
      opacity: select && edit ? 1 : 0,
    },
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
        alt={locales.NO_IMAGE[lang]}
        src={value}
        style={
          attrs.displayMode === "scaleToFill" ? styles.fill : styles.normal
        }
      />
      <div className={classNames.btn} style={styles.btn}>
        <Input type="image" onChange={onValueChange} value={value} />
      </div>
    </div>
  );
});
