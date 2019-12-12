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
  params
}) {
  const style = {
    height,
    width,
    transform: `translate(${-translateX}px,${-translateY}px)scale(${scale})`,
    border: selected && "10px solid black"
  };
  const { id } = content;
  return (
    <div className={`${styles.container} step`} style={style} {...params}>
      <Panel {...content} height={height} width={width} rootId={id} />
    </div>
  );
}
