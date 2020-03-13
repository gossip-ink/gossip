import classNames from "./index.css";
import { connect } from "dva";
import { Icon } from "antd";

import Box from "../Box";
import Idea from "../Idea";

export default connect(state => ({ ideas: state.slides.ideas }), {
  handleAddCmp: (type, method) => ({
    type: "slides/createCmp",
    payload: { type, method }
  })
})(function({ height, ideas = [], setIsDrag, handleAddCmp }) {
  const items = [
    { icon: "font-size", value: "文字", type: "text" },
    { icon: "picture", value: "图片", type: "image" },
    { icon: "codepen", value: "画布", type: "canvas" }
  ];
  const styles = {
    container: {
      height
    },
    main: {
      height: height - 5
    }
  };

  const content = (
    <ul className={classNames.list}>
      {items.map(({ icon, value, type }) => (
        <li
          className={classNames.item}
          key={type}
          onClick={() => {
            handleAddCmp(type, "ideas");
          }}
        >
          <Icon type={icon} className={classNames.icon}></Icon>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <Box
      style={styles.main}
      title="想法"
      iconType="bulb"
      popover={content}
      height={height}
      nodata={ideas.length === 0}
      nodataInfo="快来添加零散的想法吧～"
    >
      {ideas.map(item => (
        <Idea key={item.id} content={item} setIsDrag={setIsDrag} />
      ))}
    </Box>
  );
});
