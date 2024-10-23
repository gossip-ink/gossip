import { Icon, Button } from "antd";
import classNames from "./index.css";
import { connect } from "dva";
export default connect(({ global }) => ({
  locales: global.locales,
  lang: global.lang,
}))(function({ height, locales, lang }) {
  const styles = {
    container: {
      height,
    },
    header: {
      height: 60,
    },
    content: {
      minHeight: height,
    },
  };
  return (
    <div className={classNames.container} style={styles.container}>
      <header className={classNames.header} style={styles.header}>
        <div className={classNames.logo}>Gossip</div>
        <Icon
          className={classNames.icon}
          type="github"
          onClick={() => window.open("https://github.com/gossip-ink/gossip")}
        />
      </header>
      <div className={classNames.content} style={styles.content}>
        <div className={classNames.title}>
          <h1 className={classNames.big}>Gossip</h1>
          <p>{locales.HEADER_INFO[lang]}</p>
          <Button type="primary">{locales.BIG_SCREEN[lang]}</Button>
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
});
