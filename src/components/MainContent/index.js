import styles from "./index.css";
import Slide from "../Slide/index";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "dva";

export default connect(state => ({
  components: state.slides.components,
  selectedId: state.slides.selectedId
}))(function({ height, selectedId, components }) {
  const windowSize = useWindowSize();
  const width = windowSize.width / 2;
  const translateX = (windowSize.width - width) / 2,
    translateY = (windowSize.height - height) / 2;
  const content = components.find(v => v.id === selectedId);

  return (
    <div style={{ height }} className={styles.container}>
      <Slide
        height={windowSize.height}
        width={windowSize.width}
        translateX={translateX}
        translateY={translateY}
        scale={0.45}
        content={content}
      />
    </div>
  );
});
