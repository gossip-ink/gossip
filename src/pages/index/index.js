// 项目的主页
import classNames from "./index.css";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Structure from "../../components/Structure";
import AttrPanel from "../../components/AttrPanel";
import Variables from "../../components/Variables";
import IdeasPanel from "../../components/IdeasPanel";
import SidebarPanel from "../../components/SidebarPanel";
import useWindowSize from "react-use/lib/useWindowSize";
import { connect } from "dva";
import { Modal, Button } from "antd";
import { useState } from "react";

export default connect(
  ({ global }) => ({
    help: global.help
  }),
  {
    setHelp: () => ({ type: "global/setHelp" })
  }
)(function({ help, setHelp }) {
  // 计算每个部分的高度
  const { height, width } = useWindowSize();
  const [show, setShow] = useState(!help);
  const headerHeight = 60,
    contentHeight = height - headerHeight,
    sidebarHeight = contentHeight * 0.7,
    ideaHeight = contentHeight * 0.3,
    slideHeight = contentHeight,
    structureHeight = contentHeight * 0.4,
    attrPanelHeight = contentHeight * 0.3,
    varHeight = contentHeight * 0.3;

  const props = {
    header: {
      height: headerHeight
    },
    sidebar: {
      height: sidebarHeight
    },
    ideas: {
      height: ideaHeight
    },
    mainContent: {
      height: slideHeight,
      width: width - 600
    },
    structure: {
      height: structureHeight
    },
    attrPanel: {
      height: attrPanelHeight
    },
    variables: {
      height: varHeight
    }
  };

  return (
    <div className={classNames.container}>
      <Header {...props.header} />
      <div className={classNames.content}>
        <div className={classNames.left}>
          <IdeasPanel {...props.ideas} />
          <SidebarPanel {...props.sidebar} />
        </div>
        <div className={classNames.main}>
          <MainContent {...props.mainContent} />
        </div>
        <div className={classNames.right}>
          <Structure {...props.structure} />
          <AttrPanel {...props.attrPanel} />
          <Variables {...props.variables} />
        </div>
      </div>
      <Modal
        title="提示"
        visible={show}
        okText="去学习"
        cancelText="先随便看看"
        onOk={() => {
          window.open("https://github.com/pearmini/uidea");
          setShow(false);
        }}
        onCancel={() => setShow(false)}
      >
        <div className={classNames.help}>
          <p>
            <b>uIdea</b>&nbsp;制作幻灯片的方法和常规软件方式有所区别，
          </p>
          <p>建议用10到20分钟的学习，</p>
          <p>从此打开制作幻灯片的新方式🚀</p>
          <Button
            onClick={() => {
              setShow(false);
              setHelp();
            }}
          >
            不再提醒
          </Button>
        </div>
      </Modal>
    </div>
  );
});
