import styles from "./index.css";
import { Layout, Row, Col } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
const { Header, Content } = Layout;

import Outline from "../../components/Outline";
import Thumbnails from "../../components/Thumbnails/index";
import ToolBar from "../../components/ToolBar/index";
import CmpBar from "../../components/CmpBar/index";
import MainContent from "../../components/MainContent/index";
import Structure from "../../components/Structure/index";
import AttrPanel from "../../components/AttrPanel/index";
import Variables from "../../components/Variables/index";
// import

export default function() {
  const windowSize = useWindowSize();
  const headerHeight = 64,
    contentHeight = windowSize.height - headerHeight,
    toolBarHeight = 48,
    ratio = 0.5,
    slideHeight = windowSize.height - toolBarHeight,
    structureHeight = contentHeight * ratio,
    attrPanelHeight = contentHeight - structureHeight;

  return (
    <Layout>
      <Header style={{ height: headerHeight }} className={styles.header}>
        <Row>
          <Col span={6}>uIdea</Col>
          <Col span={12}>title</Col>
          <Col span={6}>
            <ToolBar />
          </Col>
        </Row>
      </Header>
      <Content style={{ height: contentHeight }}>
        <Row>
          <Col span={4}>
            <Outline height={contentHeight} />
          </Col>
          <Col span={2}>
            <Thumbnails height={contentHeight} />
          </Col>
          <Col span={12}>
            <CmpBar height={toolBarHeight} />
            <MainContent height={slideHeight} />
          </Col>
          <Col span={6}>
            <Structure height={structureHeight} />
            <Row>
              <Col span={12}>
                <AttrPanel height={attrPanelHeight} />
              </Col>
              <Col span={12}>
                <Variables height={attrPanelHeight} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
