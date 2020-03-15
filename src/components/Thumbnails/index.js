import classNames from "./index.css";
import { connect } from "dva";
import { useWindowSize } from "react-use";
import Slide from "../Slide/index";
import { dfs } from "../../utils/tree";

export default connect(
  state => ({
    components: state.slides.components,
    structure: state.slides.structure,
    selectedId: state.slides.selectedId,
    selectedPanel: state.slides.selectedPanel,
    isDrag: state.global.isDragIdea
  }),
  {
    setSelected: id => ({ type: "slides/setSelected", payload: { id } }),
    setSelectedPanel: type => ({
      type: "slides/setSelectedPanel",
      payload: { type }
    }),
    deleteNode: id => ({ type: "slides/deleteNode", payload: { id } }),
    setIsDrag: drag => ({ type: "global/setDragIdea", payload: { drag } })
  }
)(function({
  height,
  components,
  structure,
  selectedId,
  setSelected,
  setSelectedPanel,
  isDrag,
  setIsDrag
}) {
  // 布局
  const windowSize = useWindowSize();
  const scale = 0.1;

  // 按照顺序获得 slides
  const ids = [];
  dfs(structure, node => ids.push(node.id));
  const nodes = ids.map(id => components.find(d => d.id === id));

  const styles = {
    container: {
      height
    },
    wrapper: {
      transformOrigin: "left top",
      transform: `scale(${scale})`,
      width: windowSize.width * scale,
      height: windowSize.height * scale
    }
  };

  return (
    <div
      style={styles.container}
      className={classNames.container}
      onClick={() => {
        setSelectedPanel(1);
      }}
    >
      {nodes.map(item => (
        <div
          key={item.id}
          onClick={() => setSelected(item.id)}
          style={styles.wrapper}
          className={classNames.wrapper}
        >
          <Slide
            height={windowSize.height}
            width={windowSize.width}
            content={item}
            selected={selectedId === item.id}
            selectable={true}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
          />
        </div>
      ))}
    </div>
  );
});
