import classNames from "./index.css";
import { Icon, Popover, Button } from "antd";
export default function({
  nodata,
  iconType,
  title,
  popover,
  children,
  height,
  nodataInfo
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
  return (
    <div className={classNames.box} style={styles.box}>
      <div className={classNames.container} style={styles.container}>
        <div className={classNames.wrapper}>
          <div className={classNames.header}>
            <div>
              <Icon type={iconType}></Icon>
              <span className={classNames.title}>{title}</span>
            </div>
            {popover && (
              <Popover
                content={popover}
                title="选择一种类型"
                placement="bottomRight"
              >
                <Button icon="plus" type="primary" />
              </Popover>
            )}
          </div>
        </div>
        <div className={classNames.content} style={styles.content}>
          {nodata ? children : children}
        </div>
      </div>
    </div>
  );
}
