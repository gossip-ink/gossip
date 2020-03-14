// 项目的主页
import classNames from "./index.css";
import useWindowSize from "../../hooks/useWindowSize";
import { useState } from "react";
import { Row, Col } from "antd";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Structure from "../../components/Structure";
import AttrPanel from "../../components/AttrPanel";
import Variables from "../../components/Variables";
import IdeasPanel from "../../components/IdeasPanel";
import SidebarPanel from "../../components/SidebarPanel";

export default function() {
  // 计算每个部分的高度
  const { height } = useWindowSize();
  const [isDrag, setIsDrag] = useState(false);

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
      height: sidebarHeight,
      isDrag,
      setIsDrag
    },
    ideas: {
      height: ideaHeight,
      setIsDrag
    },
    mainContent: {
      height: slideHeight,
      isDrag,
      setIsDrag
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
      <Row>
        <Col span={4}>
          <IdeasPanel {...props.ideas} />
          <SidebarPanel {...props.sidebar} />
        </Col>
        <Col span={16}>
          <MainContent {...props.mainContent} />
        </Col>
        <Col span={4}>
          <Structure {...props.structure} />
          <AttrPanel {...props.attrPanel} />
          <Variables {...props.variables} />
        </Col>
      </Row>
    </div>
  );
}
