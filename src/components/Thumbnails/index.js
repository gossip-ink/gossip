import styles from "./index.css"
export default function({ height }) {
  return (
    <div style={{height}} className={styles.container}>
      <h1>Thumbnails</h1>
    </div>
  );
}
