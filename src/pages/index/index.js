import styles from "./index.css";
import router from "umi/router";
import { Layout, Button, Row, Col } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
const { Header, Content } = Layout;

import Outline from "../../components/Outline";
import Thumbnails from "../../components/Thumbnails/index";
import ToolBar from "../../components/ToolBar/index";
import MainContent from "../../components/MainContent/index";
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

  function handleClickPlay(e){
    router.push('/present');
  }

  return (
    <Layout>
      <Header style={{ height: headerHeight }} className={styles.header}>
        <Row>
          <Col span={6}>uIdea</Col>
          <Col span={12}>title</Col>
          <Col span={6}>
            <Button type="primary" shape="circle" icon="play-circle" onClick={handleClickPlay}/>
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
            <MainContent height={slideHeight}/>
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
