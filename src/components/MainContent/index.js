import styles from "./index.css";
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
)(function({ height, selectedId, components, setSelectedComp }) {
  const windowSize = useWindowSize();
  const width = windowSize.width / 2;
  const translateX = width - windowSize.width * 0.45,
    translateY = height - windowSize.height * 0.45;
  const content = components.find(v => v.id === selectedId);

  function handleSelect(e) {
    e.stopPropagation();
    setSelectedComp(null);
  }

  return (
    <div style={{ height }} className={styles.container} onClick={handleSelect}>
      <Slide
        height={windowSize.height}
        width={windowSize.width}
        translateX={translateX}
        translateY={translateY}
        scale={0.45}
        content={content}
        editable={true}
      />
    </div>
  );
});
