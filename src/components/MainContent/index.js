import classNames from "./index.css";
import Slide from "../Slide/index";
import { Button } from "antd";
import { connect } from "dva";
import { useWindowSize } from "react-use";

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    scale: state.global.scale
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    gotoNext: () => ({ type: "slides/gotoNext" }),
    gotoPre: () => ({ type: "slides/gotoPre" }),
    setScale: scale => ({ type: "global/setScale", payload: { scale } })
  }
)(function({
  height,
  width,
  selectedId,
  components,
  setSelectedComp,
  gotoNext,
  gotoPre,
  scale,
  setScale
}) {
  const { height: wh, width: ww } = useWindowSize();
  const content = components.find(v => v.id === selectedId);
  const ratio = (width * 0.95) / ww;
  if (ratio !== scale) setScale(ratio);

  function handleSelect(e) {
    e.stopPropagation();
    setSelectedComp(null);
  }

  const styles = {
    container: {
      height
    },
    content: {
      transform: `scale(${scale})`,
      transformOrigin: "left top",
      marginLeft: 2 // 边框
    },
    wrapper: {
      width: ww * scale + 4, // 边框
      height: wh * scale
    }
  };

  return (
    <div
      style={styles.container}
      className={classNames.container}
      onClick={handleSelect}
    >
      <div className={classNames.wrapper} style={styles.wrapper}>
        <div style={styles.content}>
          <Slide height={wh} width={ww} content={content} editable={true} />
        </div>
        <div className={classNames.bar}>
          <Button
            icon="left"
            className={classNames.btnLeft}
            type="primary"
            shape="circle"
            onClick={gotoPre}
          ></Button>
          <Button
            icon="right"
            type="primary"
            shape="circle"
            onClick={gotoNext}
          ></Button>
        </div>
      </div>
    </div>
  );
});
