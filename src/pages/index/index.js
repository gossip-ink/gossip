// 项目的主页

import styles from "./index.css";
import { Layout, Row, Col, Tabs, Icon } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
const { Header, Content } = Layout;
const { TabPane } = Tabs;

import Outline from "../../components/Outline";
import Thumbnails from "../../components/Thumbnails/index";
import ToolBar from "../../components/ToolBar/index";
import MainContent from "../../components/MainContent/index";
import Structure from "../../components/Structure/index";
import AttrPanel from "../../components/AttrPanel/index";
import Variables from "../../components/Variables/index";
import IdeasPanel from "../../components/IdeasPanel/index";
import { useState } from "react";

export default function() {
  // 计算每个部分的高度和宽度
  // 这里的 useWindowSize 需要修改
  const windowSize = useWindowSize();

  // 是否拖动 idea
  const [isDrag, setIsDrag] = useState(false);
  const headerHeight = 64,
    contentHeight = windowSize.height - headerHeight,
    outlineHeight = contentHeight - 54,
    leftratio = 0.6,
    ratio = [0.35, 0.25, 0.4],
    slideHeight = windowSize.height,
    structureHeight = contentHeight * ratio[0],
    attrPanelHeight = contentHeight * ratio[1],
    varHeight = contentHeight * ratio[2];

  return (
    <Layout>
      <Header style={{ height: headerHeight }} className={styles.header}>
        <Row>
          <Col span={6}>uIdea</Col>
          <Col span={12}></Col>
          <Col span={6}>
            <ToolBar />
          </Col>
        </Row>
      </Header>
      <Content style={{ height: contentHeight }}>
        <Row>
          <Col span={4}>
            <Tabs
              defaultActiveKey="1"
              style={{ height: outlineHeight * leftratio + 54 }}
            >
              <TabPane
                tab={
                  <span>
                    <Icon type="bars" />
                    Outline
                  </span>
                }
                key="1"
              >
                <Outline
                  height={outlineHeight * leftratio}
                  setIsDrag={setIsDrag}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="layout" />
                    Thumbnails
                  </span>
                }
                key="2"
              >
                <Thumbnails
                  height={outlineHeight * leftratio}
                  isDrag={isDrag}
                  setIsDrag={setIsDrag}
                />
              </TabPane>
            </Tabs>
            <IdeasPanel
              height={outlineHeight * (1 - leftratio)}
              setIsDrag={setIsDrag}
            />
          </Col>
          <Col span={16}>
            <MainContent
              height={slideHeight}
              isDrag={isDrag}
              setIsDrag={setIsDrag}
            />
          </Col>
          <Col span={4}>
            <Structure height={structureHeight} />
            <AttrPanel height={attrPanelHeight} />
            <Variables height={varHeight} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
