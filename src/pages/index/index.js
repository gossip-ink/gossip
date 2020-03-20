// 项目的主页
import classNames from "./index.css";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Structure from "../../components/Structure";
import AttrPanel from "../../components/AttrPanel";
import SidebarPanel from "../../components/SidebarPanel";
import useWindowSize from "react-use/lib/useWindowSize";
import { connect } from "dva";
import { Modal, Button } from "antd";
import { useState } from "react";

export default connect(
  ({ global }) => ({
    help: global.help,
    show: global.show
  }),
  {
    setHelp: () => ({ type: "global/setHelp" })
  }
)(function({ help, setHelp, show }) {
  // 计算每个部分的高度
  const { height, width } = useWindowSize();
  const [pop, setPop] = useState(!help);
  const { structure, attr } = show;

  const headerHeight = 60,
    contentHeight = height - headerHeight,
    structureHeight = Math.min(
      (contentHeight * structure) / (attr + structure),
      contentHeight - 45
    ),
    attrPanelHeight = Math.min(
      (contentHeight * attr) / (attr + structure),
      contentHeight - 45
    );

  const props = {
    header: {
      height: headerHeight
    },
    sidebar: {
      height: contentHeight,
      name: "outline"
    },
    mainContent: {
      height: contentHeight,
      width: width - 600
    },
    structure: {
      height: structureHeight,
      name: "structure"
    },
    attrPanel: {
      height: attrPanelHeight,
      name: "attr"
    }
  };

  return (
    <div className={classNames.container}>
      <Header {...props.header} />
      <div className={classNames.content}>
        <div className={classNames.left}>
          <SidebarPanel {...props.sidebar} />
        </div>
        <div className={classNames.main}>
          <MainContent {...props.mainContent} />
        </div>
        <div className={classNames.right}>
          <Structure {...props.structure} />
          <AttrPanel {...props.attrPanel} />
        </div>
      </div>
      <Modal
        title="提示"
        visible={pop}
        okText="去学习"
        cancelText="先随便看看"
        onOk={() => {
          window.open("https://github.com/pearmini/uidea");
          setPop(false);
        }}
        onCancel={() => setPop(false)}
      >
        <div className={classNames.help}>
          <p>
            <b>uIdea</b>&nbsp;制作幻灯片的方法和常规软件方式有所区别，
          </p>
          <p>建议用10到20分钟的学习，</p>
          <p>从此打开制作幻灯片的新方式🚀</p>
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
});
