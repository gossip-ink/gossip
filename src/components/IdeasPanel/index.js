import styles from "./index.css";
import { connect } from "dva";
import CompBar from "../CmpBar/index";
import Idea from "../Idea/index";
export default connect(state => ({ ideas: state.slides.ideas }))(function({
  height,
  ideas = [],
  setIsDrag
}) {
  return (
    <div style={{ height, overflow: "auto" }}>
      <div style={{ display: "flex" }}>
        <h1>Ideas</h1>
        <CompBar options={false} />
      </div>
      <div>
        {/* 这里使用 index 会出问题 */}
        {ideas.map(item => (
          <Idea key={item.id} content={item} setIsDrag={setIsDrag} />
        ))}
      </div>
    </div>
  );
});
