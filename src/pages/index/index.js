import styles from "./index.css";
import { Layout, Icon, Button, Row, Col } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
const { Header, Content } = Layout;

import Outline from "../../components/Outline";
import Thumbnails from "../../components/Thumbnails/index";
import ToolBar from "../../components/ToolBar/index";
import Slide from "../../components/Slide/index";
import Structure from "../../components/Structure/index";
import AttrPanel from "../../components/AttrPanel/index";

export default function() {
  const windowSize = useWindowSize();
  const headerHeight = 64,
    contentHeight = windowSize.height - headerHeight,
    toolBarHeight = 48,
    ratio = 0.6,
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
            <Button type="primary" shape="circle" icon="play-circle" />
            <Button type="primary" shape="circle" icon="file-add" />
            <Button type="primary" shape="circle" icon="upload" />
            <Button type="primary" shape="circle" icon="download" />
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
            <ToolBar height={toolBarHeight} />
            <Slide height={slideHeight} />
          </Col>
          <Col span={6}>
            <Structure height={structureHeight}/>
            <AttrPanel height={attrPanelHeight}/>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
