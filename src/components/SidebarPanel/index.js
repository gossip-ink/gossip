import classNames from "./index.css";
import Outline from "../Outline";
import Thumbnails from "../Thumbnails";
import { Tabs, Icon } from "antd";
const { TabPane } = Tabs;
export default function({ height, isDrag, setIsDrag }) {
  const content = height - 10;
  const props = {
    outline: {
      setIsDrag,
      height: content - 50
    },
    thumbnails: {
      height: content - 50,
      isDrag,
      setIsDrag
    }
  };
  const outlineTab = (
      <span>
        <Icon type="bars" />
        大纲
      </span>
    ),
    thumbnailsTab = (
      <span>
        <Icon type="layout" />
        缩略图
      </span>
    );
  const styles = {
    container: {
      height
    },
    main: {
      height: content
    },
    tabbar: {
      margin: 0
    }
  };
  return (
    <div style={styles.container} className={classNames.container}>
      <div style={styles.main} className={classNames.main}>
        <Tabs defaultActiveKey="1" tabBarStyle={styles.tabbar}>
          <TabPane tab={outlineTab} key="1">
            <Outline {...props.outline} />
          </TabPane>
          <TabPane tab={thumbnailsTab} key="2">
            <Thumbnails {...props.thumbnails} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
