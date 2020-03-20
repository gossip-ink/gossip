import classNames from "./index.css";
import { Icon, Popover, Button, Empty, Switch } from "antd";
import { useState, useEffect } from "react";
import { connect } from "dva";
export default connect(
  ({ global }) => ({
    vis: global.show
  }),
  {
    toggleShow: key => ({ type: "global/toggleShow", payload: { key } })
  }
)(function({
  nodata = true,
  title,
  popover,
  children,
  height,
  onSwitch,
  nodataInfo = "没有数据",
  url = "https://github.com/pearmini/uidea",
  toggleShow,
  vis,
  name,
  closable = true
}) {
  const [show, setShow] = useState(false);
  const styles = {
    box: {
      height: Math.max(45, height)
    },
    container: {
      height: Math.max(height - 10, 45)
    },
    content: {
      height: Math.max(height - 10 - 60, 0)
    }
  };

  useEffect(() => {
    const clickHandler = () => show && setShow(false);
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  });

  return (
    <div className={classNames.box} style={styles.box}>
      <div className={classNames.container} style={styles.container}>
        <div className={classNames.wrapper}>
          <div className={classNames.header}>
            <div>
              <span className={classNames.title}>{title}</span>
              <Icon
                type="question-circle"
                className={classNames.leftIcon}
                onClick={() => window.open(url)}
              ></Icon>
              {closable && (
                <Icon
                  type={vis[name] ? "close-circle" : "check-circle"}
                  className={classNames.icon}
                  onClick={() => toggleShow(name)}
                ></Icon>
              )}
            </div>
            <div>
              {onSwitch && <Switch defaultChecked onChange={onSwitch} />}
              {popover && (
                <Popover
                  content={popover}
                  title="选择一种类型"
                  placement="bottomRight"
                  visible={show}
                  arrowPointAtCenter
                >
                  <Button
                    className={classNames.rightBtn}
                    icon="plus"
                    type="primary"
                    shape="circle"
                    size="small"
                    onClick={e => {
                      setShow(!show);
                      e.stopPropagation();
                    }}
                  />
                </Popover>
              )}
            </div>
          </div>
        </div>
        <div className={classNames.content} style={styles.content}>
          {nodata ? (
            <div style={styles.content} className={classNames.empty}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={nodataInfo}
              />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
});
