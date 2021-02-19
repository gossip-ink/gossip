import useWindowSize from "react-use/lib/useWindowSize";
import Intro from "../components/Intro";
import { Modal, Button } from "antd";
import { useState, useEffect } from "react";
import { connect } from "dva";
import "./index.css";
import classNames from "./index.css";

export default connect(
  ({ global, slides }) => ({
    help: global.help,
    slides,
    locales: global.locales,
    lang: global.lang,
  }),
  {
    setHelp: () => ({ type: "global/setHelp" }),
  }
)(function({ children, help, setHelp, slides, locales, lang }) {
  const { width, height } = useWindowSize();
  const [pop, setPop] = useState(!help);

  function hasChange() {
    const oldSlides = JSON.parse(localStorage.getItem("uIdea"));
    const content = (data) => ({
      structure: data.structure,
      components: data.components,
      attributeVars: data.attributeVars,
      ideas: data.ideas,
    });
    const oldData = JSON.stringify(content(oldSlides));
    const newData = JSON.stringify(content(slides));
    return newData !== oldData;
  }

  // 在离开或者刷新页面之前提醒用户保存
  function handleBeforeUnLoad(e) {
    if (width <= 700) return;
    if (!hasChange()) return;
    const confirmationMessage = "o/";
    (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
    return confirmationMessage;
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnLoad);
    return () => window.removeEventListener("beforeunload", handleBeforeUnLoad);
  });

  if (width > 700)
    return (
      <div>
        {children}
        <Modal
          title={locales.TIP[lang]}
          visible={pop}
          okText={locales.LEARN[lang]}
          cancelText={locales.CHECK_AROUND[lang]}
          onOk={() => {
            window.open(
              "https://www.yuque.com/docs/share/5aef3b0a-28af-4c56-9967-217a7f02c70a?#"
            );
            setPop(false);
          }}
          onCancel={() => setPop(false)}
        >
          <div className={classNames.help}>
            <p>{locales.DIFFERENT[lang]}</p>
            <p>{locales.LEARN_TIME[lang]}</p>
            <p>{locales.NEW_WAY[lang]}</p>
            <p>{locales.BEST[lang]}</p>
            <Button
              onClick={() => {
                setPop(false);
                setHelp();
              }}
              style={{
                width: 200,
              }}
            >
              {locales.NO_REMINDER[lang]}
            </Button>
          </div>
        </Modal>
      </div>
    );
  else return <Intro height={height} />;
});
