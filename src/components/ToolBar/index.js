import styles from "./index.css";
import { Button } from "antd";
export default function({ height }) {
  return (
    <div style={{ height }} className={styles.container}>
      <Button icon="font-size" type="primary" />
      <Button type="primary" icon="picture" />
      <Button type="primary" icon="code"/>
    </div>
  );
}
