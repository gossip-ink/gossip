// 项目的主页
import classNames from "./index.css";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Structure from "../../components/Structure";
import AttrPanel from "../../components/AttrPanel";
import Variables from "../../components/Variables";
import SidebarPanel from "../../components/SidebarPanel";
import useWindowSize from "react-use/lib/useWindowSize";
import { connect } from "dva";

export default connect(({ global }) => ({
  show: global.show
}))(function({ show }) {
  // 计算每个部分的高度
  const { height, width } = useWindowSize();
  const { structure, attr, vari } = show;
  const headerHeight = 60,
    contentHeight = height - headerHeight,
    total = structure + attr + vari,
    totalHeight = contentHeight - (3 - total) * 45,
    structureHeight = (totalHeight * structure) / total,
    attrPanelHeight = (totalHeight * attr) / total,
    varHeight = (totalHeight * vari) / total;

  const props = {
    header: {
      height: headerHeight
    },
    sidebar: {
      height: contentHeight
    },
    mainContent: {
      height: contentHeight,
      width: width - 600
    },
    structure: {
      height: structureHeight
    },
    attrPanel: {
      height: attrPanelHeight
    },
    Variables: {
      height: varHeight
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
          <Variables {...props.Variables} />
        </div>
      </div>
    </div>
  );
});
