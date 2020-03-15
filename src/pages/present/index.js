import { connect } from "dva";
import { useEffect } from "react";
import { dfs, copyTree } from "../../utils/tree";
import getLayout from "../../utils/overview";
import router from "umi/router";
import Slide from "../../components/Slide";
import Impress from "../../components/Impress";
import Step from "../../components/Step";
import { useWindowSize } from "react-use";
import classNames from "./index.css";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components
  }),
  {
    setSelectedComp: id => ({ type: "slides/setSelectedComp", payload: { id } })
  }
)(function({ structure, components, setSelectedComp }) {
  const { width, height } = useWindowSize();
  // 按照顺序获得 slides
  const slides = [];
  dfs(structure, node => {
    const cmp = components.find(item => item.id === node.id);
    slides.push(cmp);
  });

  // 拷贝 tree， 并且添加 attr
  const tree = copyTree(structure);
  dfs(tree, node => {
    Object.assign(node, {
      data: {
        width,
        height
      }
    });
  });

  // 进行布局
  const treemap = [];
  const data = getLayout(tree);
  dfs(data, node => treemap.push(node));
  setSelectedComp(-1);

  // 监听事件
  useEffect(() => {
    const back = e => {
      if (e.keyCode === 27) router.push("/");
      e.preventDefault();
    };
    window.addEventListener("keydown", back);
    return () => window.removeEventListener("keydown", back);
  });

  return (
    <div
      className={classNames.container}
      style={{ height, width, background: "#efefef" }}
    >
      <Impress overviewOpen={true}>
        {slides.map((item, index) => (
          <Step x={treemap[index].x} y={treemap[index].y} key={index}>
            <div
              style={{
                transform: "scale(0.8)"
              }}
            >
              <Slide content={item} key={item.id} />
            </div>
          </Step>
        ))}
      </Impress>
    </div>
  );
});
