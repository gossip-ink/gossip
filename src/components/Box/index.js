import classNames from "./index.css";
import { Icon, Popover, Button, Empty, Switch } from "antd";
import { useState, useEffect } from "react";
export default function({
  nodata = true,
  title,
  popover,
  children,
  height,
  onSwitch,
  nodataInfo = "没有数据",
  url = "https://github.com/pearmini/uidea"
}) {
  const [show, setShow] = useState(false);
  const styles = {
    box: {
      height
    },
    container: {
      height: height - 10
    },
    content: {
      height: height - 10 - 60
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
              <Icon
                type="question-circle"
                className={classNames.icon}
                onClick={() => window.open(url)}
              ></Icon>
              <span className={classNames.title}>{title}</span>
            </div>
            {onSwitch && <Switch defaultChecked onChange={onSwitch} />}
            {popover && (
              <Popover
                content={<div onClick={() => setShow(false)}>{popover}</div>}
                title="选择一种类型"
                placement="bottomRight"
                visible={show}
              >
                <Button
                  icon="plus"
                  type="primary"
                  shape="circle"
                  size="small"
                  onClick={() => setShow(true)}
                />
              </Popover>
            )}
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
}
