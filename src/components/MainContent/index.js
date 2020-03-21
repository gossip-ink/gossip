import classNames from "./index.css";
import Slide from "../Slide";
import Idea from "../Idea";
import Box from "../Box";
import { useEffect } from "react";
import { connect } from "dva";
import useWindowSize from "react-use/lib/useWindowSize";
import { Icon } from "antd";

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    scale: state.global.scale,
    show: state.global.show.idea,
    ideas: state.slides.ideas
  }),
  {
    setSelectedComp: id => ({
      type: "slides/setSelectedComp",
      payload: { id }
    }),
    gotoNext: () => ({ type: "slides/gotoNext" }),
    gotoPre: () => ({ type: "slides/gotoPre" }),
    setScale: scale => ({ type: "global/setScale", payload: { scale } }),
    addIdea: type => ({
      type: "slides/addIdea",
      payload: { type }
    })
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
  setScale,
  show,
  ideas,
  addIdea
}) {
  const { height: wh, width: ww } = useWindowSize();
  const content = components.find(v => v.id === selectedId);
  const padding = Math.min(20, width * 0.05),
    ratio = (width - padding * 2) / ww;
  const slideW = ww * scale, // 边框
    slideH = wh * scale,
    ideaH = 180;
  if (ratio !== scale) setScale(ratio);

  const items = [
    { icon: "font-size", value: "文字", type: "text" },
    { icon: "picture", value: "图片", type: "image" },
    { icon: "codepen", value: "画布", type: "canvas" }
  ];

  const pop = (
    <ul className={classNames.list}>
      {items.map(({ icon, value, type }) => (
        <li
          className={classNames.item}
          key={type}
          onClick={() => addIdea(type)}
        >
          <Icon type={icon} className={classNames.icon}></Icon>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );

  const styles = {
    container: {
      height
    },
    box: {
      height: show ? height - ideaH : height - 45,
      marginTop: padding,
      marginBottom: padding - 5
    },
    slide: {
      width: Math.ceil(slideW + 2),
      height: Math.ceil(slideH + 2)
    },
    wrapper: {
      transform: `scale(${scale})`,
      transformOrigin: "left top"
    },
    bottom: {
      width: slideW
    }
  };

  const props = {
    slide: {
      height: wh,
      width: ww,
      content,
      editable: true
    },
    ideas: {
      height: show ? ideaH : 0,
      name: "idea",
      title: "素材",
      popover: pop,
      nodata: ideas.length === 0,
      nodataInfo: "快来写下第一个独一无二的想法吧～"
    }
  };

  useEffect(() => {
    const keydownHandler = e => {
      const key = e.keyCode;
      if (key === 33 || key === 38) gotoPre();
      else if (key === 40 || key === 39) gotoNext();
    };
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  });

  return (
    <div
      style={styles.container}
      className={classNames.container}
      onClick={() => setSelectedComp(null)}
    >
      <div style={styles.box} className={classNames.box}>
        <div style={styles.slide} className={classNames.slide}>
          <div style={styles.wrapper}>
            <Slide {...props.slide} />
          </div>
        </div>
      </div>
      <Box {...props.ideas}>
        <div style={styles.bottom} className={classNames.bottom}>
          {ideas.map(item => (
            <Idea key={item.id} content={item} />
          ))}
        </div>
      </Box>
    </div>
  );
});
