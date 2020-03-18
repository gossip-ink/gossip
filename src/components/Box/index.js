import classNames from "./index.css";
import { Icon, Popover, Button, Empty, Switch, Modal } from "antd";
import { useState } from "react";
export default function({
  nodata = true,
  title,
  popover,
  children,
  height,
  intro,
  onSwitch,
  nodataInfo = "没有数据"
}) {
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

  function handleHelp() {
    Modal.info({
      title: `使用指南-${title}`,
      content: intro,
      okText: "懂了"
    });
  }
  return (
    <div className={classNames.box} style={styles.box}>
      <div className={classNames.container} style={styles.container}>
        <div className={classNames.wrapper}>
          <div className={classNames.header}>
            <div>
              <Icon
                type="question-circle"
                className={classNames.icon}
                onClick={handleHelp}
              ></Icon>
              <span className={classNames.title}>{title}</span>
            </div>
            {onSwitch && <Switch defaultChecked onChange={onSwitch} />}
            {popover && (
              <Popover
                content={popover}
                title="选择一种类型"
                placement="bottomRight"
              >
                <Button
                  icon="plus"
                  type="primary"
                  shape="circle"
                  size="small"
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
