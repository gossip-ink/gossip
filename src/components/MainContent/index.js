import classNames from "./index.css";
import Slide from "../Slide";
import Idea from "../Idea";
import Box from "../Box";
import AIAssistantDialog from "../AIAssistantDialog";
import { useEffect, useState } from "react";
import { connect } from "dva";
import useWindowSize from "react-use/lib/useWindowSize";
import { Icon, Button } from "antd";

export default connect(
  (state) => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    scale: state.global.scale,
    show: state.global.show.idea,
    ideas: state.slides.ideas,
    selectedIdea: state.slides.selectedIdea,
    locales: state.global.locales,
    lang: state.global.lang,
  }),
  {
    setSelectedComp: (id) => ({
      type: "slides/setSelectedComp",
      payload: { id },
    }),
    gotoNext: () => ({ type: "slides/gotoNext" }),
    gotoPre: () => ({ type: "slides/gotoPre" }),
    setScale: (scale) => ({ type: "global/setScale", payload: { scale } }),
    addIdea: (type) => ({
      type: "slides/addIdea",
      payload: { type },
    }),
    addIdeaWithValue: (payload) => ({
      type: "slides/addIdeaWithValue",
      payload,
    }),
  }
)(function({
  lang,
  locales,
  height,
  width,
  selectedId,
  components,
  setSelectedComp,
  selectedIdea,
  gotoNext,
  gotoPre,
  scale,
  setScale,
  show,
  ideas,
  addIdea,
  addIdeaWithValue,
}) {
  const { height: wh, width: ww } = useWindowSize();
  const content = components.find((v) => v.id === selectedId);
  const padding = Math.min(20, width * 0.05),
    ratio = (width - padding * 2) / ww;
  const slideW = ww * scale, // 边框
    slideH = wh * scale,
    ideaH = 180;
  if (ratio !== scale) setScale(ratio);

  const [aiDialogVisible, setAiDialogVisible] = useState(false);

  const items = [
    { icon: "font-size", value: locales.THOUGHT_TEXT[lang], type: "text" },
    { icon: "picture", value: locales.THOUGHT_IMAGE[lang], type: "image" },
    { icon: "codepen", value: locales.THOUGHT_CANVAS[lang], type: "canvas" },
  ];

  const pop = (
    <ul className={classNames.list}>
      {items.map(({ icon, value, type }) => (
        <li
          className={classNames.item}
          key={type}
          onClick={() => addIdea(type)}
        >
          <Icon type={icon} className={classNames.icon} />
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );

  const styles = {
    container: {
      height,
    },
    box: {
      height: show ? height - ideaH : height - 45,
      marginTop: padding,
      marginBottom: padding - 5,
    },
    slide: {
      width: Math.ceil(slideW + 2),
      height: Math.ceil(slideH + 2),
    },
    wrapper: {
      transform: `scale(${scale})`,
      transformOrigin: "left top",
    },
    bottom: {
      width: slideW,
    },
  };

  const props = {
    slide: {
      height: wh,
      width: ww,
      content,
      editable: true,
    },
    ideas: {
      width: slideW,
      height: show ? ideaH : 0,
      name: "idea",
      title: locales.THOUGHT[lang],
      popover: pop,
      nodata: ideas.length === 0,
      nodataInfo: locales.NO_IDEA[lang],
      url:
        "https://github.com/gossip-ink/gossip#generating-idea",
      aiAssistant: true,
      onAiClick: () => setAiDialogVisible(true),
    },
  };

  function scrollTo(id) {
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.onclick = () => false;
    a.click();
  }

  const handleAiInsert = (content) => {
    // 将AI返回的内容按行分割，每条作为独立的想法插入
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && line.length > 0);

    if (lines.length === 0) return;

    // 为每一行创建一个文本类型的想法
    lines.forEach(line => {
      const id = Date.now() + Math.random();
      addIdeaWithValue({
        id,
        type: 'text',
        value: line,
      });
    });

    setAiDialogVisible(false);
  };

  useEffect(
    () => {
      scrollTo(selectedIdea);
    },
    [selectedIdea]
  );

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
          <div className={classNames.btnGroup}>
            <Button
              icon="left"
              shape="circle"
              size="small"
              type="primary"
              onClick={gotoPre}
            />
            <Button
              className={classNames.rightBtn}
              icon="right"
              shape="circle"
              size="small"
              type="primary"
              onClick={gotoNext}
            />
          </div>
        </div>
      </div>
      <Box {...props.ideas}>
        <div style={styles.bottom} className={classNames.bottom}>
          {ideas.map((item) => (
            <Idea key={item.id} content={item} id={item.id} />
          ))}
        </div>
      </Box>
      <AIAssistantDialog
        visible={aiDialogVisible}
        onCancel={() => setAiDialogVisible(false)}
        onInsert={handleAiInsert}
      />
    </div>
  );
});
