import { Icon, Button } from "antd";
import classNames from "./index.css";
export default function({ height }) {
  const styles = {
    container: {
      height
    },
    header: {
      height: 60
    },
    content: {
      minHeight: height
    }
  };
  return (
    <div className={classNames.container} style={styles.container}>
      <header className={classNames.header} style={styles.header}>
        <div className={classNames.logo}>Gossip</div>
        <Icon
          className={classNames.icon}
          type="github"
          onClick={() => window.open("https://github.com/pearmini/gossip")}
        />
      </header>
      <div className={classNames.content} style={styles.content}>
        <div className={classNames.title}>
          <h1 className={classNames.big}>Gossip</h1>
          <p>你的下一份 PPT，未必是一份 PPT🔥</p>
          <Button type="primary">请去大屏设备上使用</Button>
        </div>
        <div className={classNames.imageWrapper}>
          <img
            src="https://i.loli.net/2020/03/26/uFrys8ReZdghXL3.png"
            width="65%"
            className={classNames.top}
          />
          <img
            src="https://i.loli.net/2020/03/26/YzhWKcCUMvH8m9D.png"
            width="65%"
          />
        </div>
      </div>
    </div>
  );
}
