import styles from "./index.css";
import AddButton from "../AddButton/index";
import { connect } from "dva";
export default connect(null, {
  handleAddCmp: (type, method) => ({
    type: "slides/createCmp",
    payload: { type, method }
  })
})(function({ height, handleAddCmp }) {
  return (
    <div style={{ height }} className={styles.container}>
      <AddButton
        icon="font-size"
        onSelectValue={method => handleAddCmp("text", method)}
      />
      <AddButton
        icon="picture"
        onSelectValue={method => handleAddCmp("image", method)}
      />
      <AddButton
        icon="codepen"
        onSelectValue={method => handleAddCmp("canvas", method)}
      />
      <AddButton
        icon="container"
        onSelectValue={method => handleAddCmp("panel", method)}
      />
    </div>
  );
});
