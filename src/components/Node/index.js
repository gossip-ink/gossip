import { useState } from "react";
import { Icon, Upload } from "antd";
import classNames from "./index.css";

export default function({
  highlight = false,
  edit,
  children,
  onDelete,
  onEdit,
  onAdd,
  onImageChange,
  type,
  width,
  height,
  popover,
  nomove = false,
  hasDelete = true,
  ...rest
}) {
  const [hovered, setHoverd] = useState(false);
  const styles = {
    container: {
      height,
      width,
      border: highlight ? "1px solid #4091f7" : "1px solid #d9d9d9",
      cursor: nomove ? "pointer" : "move"
    },
    upload: {
      opacity: hovered ? 1 : 0,
      display: "inline"
    }
  };
  return (
    <div
      className={classNames.container}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
      style={styles.container}
      {...rest}
    >
      {children}
      <div>
        {type === "image" ? (
          <div style={styles.upload}>
            <Upload
              accept="image/*"
              onChange={onImageChange}
              showUploadList={false}
              customRequest={() => {}}
              className={classNames.edit}
            >
              <Icon type="upload" />
            </Upload>
          </div>
        ) : (
          hovered &&
          onEdit && (
            <Icon
              type={edit ? "save" : "edit"}
              onClick={e => {
                onEdit(e);
                e.stopPropagation();
              }}
              className={classNames.edit}
            />
          )
        )}
        {hasDelete && hovered && (
          <Icon
            type="delete"
            onClick={onDelete}
            className={classNames.delete}
          />
        )}
      </div>
    </div>
  );
}
