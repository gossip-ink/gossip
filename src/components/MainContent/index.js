import classNames from "./index.css";
import Slide from "../Slide/index";
import { Button } from "antd";
import { connect } from "dva";
import { useWindowSize } from "react-use";

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    gotoNext: () => ({ type: "slides/gotoNext" }),
    gotoPre: () => ({ type: "slides/gotoPre" })
  }
)(function({
  height,
  width,
  selectedId,
  components,
  setSelectedComp,
  gotoNext,
  gotoPre
}) {
  const { height: wh, width: ww } = useWindowSize();
  const content = components.find(v => v.id === selectedId);
  const scale = (width * 0.95) / ww;

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
      transformOrigin: "left top"
    },
    wrapper: {
      width: ww * scale,
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
