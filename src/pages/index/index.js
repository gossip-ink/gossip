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


export default function() {
  // 计算每个部分的高度和宽度
  // 这里的 useWindowSize 需要修改
  const windowSize = useWindowSize();
  const headerHeight = 64,
    contentHeight = windowSize.height - headerHeight,
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
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <Icon type="bars" />
                    Outline
                  </span>
                }
                key="1"
              >
                <Outline height={contentHeight - 54} />
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
                <Thumbnails height={contentHeight - 54} />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={16}>
            <MainContent height={slideHeight} />
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
