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
        <div className={classNames.logo}>uIdea</div>
        <Icon
          className={classNames.icon}
          type="github"
          onClick={() => window.open("https://github.com/pearmini/uidea")}
        />
      </header>
      <div className={classNames.content} style={styles.content}>
        <div className={classNames.big}>Present Different</div>
        <img
          src="https://i.loli.net/2020/03/18/ILzP6DTHZvd97gY.png"
          width="60%"
        />
        <img
          src="https://i.loli.net/2020/03/18/ORdIg4y2mxPHj1z.png"
          width="60%"
        />
        <Button type="primary">请去大屏设备上使用</Button>
      </div>
    </div>
  );
}
