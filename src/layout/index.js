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
  }),
  {
    setHelp: () => ({ type: "global/setHelp" }),
  }
)(function({ children, help, setHelp, slides }) {
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
          title="提示"
          visible={pop}
          okText="去学习"
          cancelText="先随便看看"
          onOk={() => {
            window.open(
              "https://www.yuque.com/docs/share/5aef3b0a-28af-4c56-9967-217a7f02c70a?#"
            );
            setPop(false);
          }}
          onCancel={() => setPop(false)}
        >
          <div className={classNames.help}>
            <p>
              <b>Gossip</b>&nbsp;制作幻灯片的方法和常规软件方式有所区别，
            </p>
            <p>建议用10到20分钟的学习，</p>
            <p>从此打开制作幻灯片的新方式🚀</p>
            <p>为保证最佳体验：请使用 Chrome、Firefox 或 Safari 浏览器！</p>
            <Button
              onClick={() => {
                setPop(false);
                setHelp();
              }}
            >
              不再提醒
            </Button>
          </div>
        </Modal>
      </div>
    );
  else return <Intro height={height} />;
});
