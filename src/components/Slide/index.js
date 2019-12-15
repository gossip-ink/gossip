import styles from "./index.css";
import Panel from "../Panel/index";
export default function({
  height,
  width,
  scale = 1,
  translateX = 0,
  translateY = 0,
  content,
  selected,
  editable = false
}) {
  const style = {
    height,
    width,
    transform: `scale(${scale}) translate(${translateX}px,${translateY}px)`,
    transformOrigin: "left top",
    border: selected && "10px solid black",
  };
  const { id } = content;
  return (
    <div className={styles.container} style={style} >
      <Panel
        {...content}
        height={height}
        width={width}
        rootId={id}
        editable={editable}
      />
    </div>
  );
}
