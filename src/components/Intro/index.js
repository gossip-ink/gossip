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
      height: height - 60
    }
  };
  return (
    <div className={classNames.container} style={styles.container}>
      <header className={classNames.header} style={styles.header}>
        <div className={classNames.logo}>Gossip</div>
        <Icon
          className={classNames.icon}
          type="github"
          onClick={() => window.open("https://github.com/pearmini/uidea")}
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
            src="https://cdn.nlark.com/yuque/0/2020/png/418707/1584928091222-0785d2d2-7edf-4faf-96d3-7d47493886f0.png"
            width="80%"
            className={classNames.top}
          />
          <img
            src="https://cdn.nlark.com/yuque/0/2020/png/418707/1584928230370-8f3a266d-ef9f-49e1-9c46-4d7ad6c86d43.png"
            width="80%"
          />
        </div>
      </div>
    </div>
  );
}
