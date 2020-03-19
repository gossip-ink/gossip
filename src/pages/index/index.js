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

export default function() {
  // 计算每个部分的高度
  const { height, width } = useWindowSize();
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
      
    </div>
  );
}
