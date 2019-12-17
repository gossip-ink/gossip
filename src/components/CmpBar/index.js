import styles from "./index.css";
import AddButton from "../AddButton/index";
import { Popover, Button } from "antd";
import { connect } from "dva";
export default connect(null, {
  handleAddCmp: (type, method) => ({
    type: "slides/createCmp",
    payload: { type, method }
  })
})(function({ height, handleAddCmp }) {
  return (
    <div style={{ marginLeft: 75 }}>
      <Popover
        content={
          <div>
            <AddButton
              icon="font-size"
              onSelectValue={method => handleAddCmp("text", method)}
              title={"文字"}
            />
            <AddButton
              icon="picture"
              onSelectValue={method => handleAddCmp("image", method)}
              title={"图片"}
            />
            <AddButton
              icon="codepen"
              onSelectValue={method => handleAddCmp("canvas", method)}
              title={"画布"}
            />
            <AddButton
              icon="container"
              onSelectValue={method => handleAddCmp("panel", method)}
              title={"容器"}
            />
          </div>
        }
        title="选择一种类型"
        placement="bottomRight"
      >
        <Button icon="plus" type="primary" />
      </Popover>
    </div>
  );
});
