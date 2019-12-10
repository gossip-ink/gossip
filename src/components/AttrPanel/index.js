import styles from "./index.css";
import { Button } from "antd";
export default function({ height }) {
  return (
    <div style={{ height }} className={styles.container}>
      <h1>AttrPanel</h1>
      <div>
        <select>
          <option>javascript</option>
          <option>c</option>
        </select>
        <Button icon="plus-circle" type="primary" shape="circle"/>
      </div>
    </div>
  );
}
