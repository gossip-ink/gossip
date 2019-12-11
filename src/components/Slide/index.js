import styles from "./index.css";
export default function({
  height,
  width,
  scale = 1,
  translateX = 0,
  translateY = 0,
  content,
  selected,
  params
}) {
  const style = {
    height,
    width,
    transform: `translate(${-translateX}px,${-translateY}px)scale(${scale})`,
    border: selected && "10px solid black"
  };
  return (
    <div className={`${styles.container} step`} style={style} {...params}>
      <p className={styles.big}>{content.name}</p>
    </div>
  );
}
