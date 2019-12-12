import styles from "./index.css";
import Slide from "../Slide/index";
import { connect } from "dva";
import useWindowSize from "../../hooks/useWindowSize";
export default connect(
  state => ({
    components: state.slides.components,
    structure: state.slides.structure,
    selectedId: state.slides.selectedId
  }),
  {
    setSelected: id => ({ type: "slides/setSelected", payload: { id } })
  }
)(function({ height, components, structure, selectedId, setSelected }) {
  function dfs(node, callback) {
    callback(node);
    node.children &&
      node.children.forEach(element => {
        dfs(element, callback);
      });
  }

  function getSlideById(id) {
    return components.find(item => item.id === id);
  }

  function handleSelect(id) {
    setSelected(id);
  }

  // 布局
  const windowSize = useWindowSize();
  const boxWidth = windowSize.width / 12,
    boxHeight = 80;
  const translateX = (windowSize.width - boxWidth) / 2,
    translateY = (windowSize.height - boxHeight) / 2;

  // 按照顺序获得 slides
  const idList = [];
  dfs(structure, node => idList.push(node.id));
  const slideList = idList.map(item => getSlideById(item));

  return (
    <div style={{ height }} className={styles.container}>
      <h1>Thumbnails</h1>
      <div>
        {slideList.map(item => (
          <div
            key={item.id}
            style={{
              height: boxHeight,
              width: boxWidth
            }}
          >
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                opacity: 0,
                height: boxHeight,
                width: boxWidth
              }}
              onClick={() => handleSelect(item.id)}
            ></div>
            <Slide
              height={windowSize.height}
              width={windowSize.width}
              translateX={translateX}
              translateY={translateY}
              scale={0.07}
              content={item}
              selected={selectedId === item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
