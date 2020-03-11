import classNames from "./index.css";
import Slide from "../Slide/index";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "dva";

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    })
  }
)(function({
  height,
  selectedId,
  components,
  setSelectedComp,
  isDrag,
  setIsDrag
}) {
  const { height: wh, width: ww } = useWindowSize();
  const content = components.find(v => v.id === selectedId);
  const scale = 0.6;

  function handleSelect(e) {
    e.stopPropagation();
    setSelectedComp(null);
  }

  const styles = {
    container: {
      height
    },
    content: {
      transform: `scale(${scale})`
    }
  };

  return (
    <div
      style={styles.container}
      className={classNames.container}
      onClick={handleSelect}
    >
      <div style={styles.content}>
        <Slide
          height={wh}
          width={ww}
          content={content}
          editable={true}
          isDrag={isDrag}
          setIsDrag={setIsDrag}
        />
      </div>
    </div>
  );
});
