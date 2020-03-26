import useWindowSize from "react-use/lib/useWindowSize";
import Intro from "../components/Intro";
import { Modal, Button } from "antd";
import { useState } from "react";
import { connect } from "dva";
import "./index.css";
import classNames from "./index.css";

export default connect(
  ({ global }) => ({
    help: global.help
  }),
  {
    setHelp: () => ({ type: "global/setHelp" })
  }
)(function({ children, help, setHelp }) {
  const { width, height } = useWindowSize();
  const [pop, setPop] = useState(!help);
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
              "https://github.com/pearmini/gossip/blob/master/tutorials.md"
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
