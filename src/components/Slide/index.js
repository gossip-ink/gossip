import styles from "./index.css";
export default function({ height }) {
  return (
    <div style={{height}} className={styles.container}>
      <h1>Slide</h1>
    </div>
  );
}
