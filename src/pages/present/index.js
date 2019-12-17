import Slide from "../../components/Slide/index";
import router from "umi/router";
import Impress from "../../components/Impress/index";
import Step from "../../components/Step/index";
import treemap from "../../utils/treemap";
import { connect } from "dva";
import { useEffect } from "react";
import { copyTree } from "../../utils/tree";
import getLayout from "../../utils/overview";
import styles from "./index.css";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components
  }),
  {
    setSelectedComp: id => ({ type: "slides/setSelectedComp", payload: { id } })
  }
)(function({ structure, components, setSelectedComp }) {
  function dfs(node, callback) {
    callback(node);
    node.children &&
      node.children.forEach(element => {
        dfs(element, callback);
      });
  }

  useEffect(() => {
    const back = function(e) {
      if (e.keyCode === 27) {
        router.push("/");
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", back);
    return () => {
      window.removeEventListener("keydown", back);
    };
  });

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
      data: { width: screen.width * 0.8, height: screen.height * 0.8 }
    });
  });

  // 进行布局
  const treemap = [];
  const data = getLayout(tree);
  dfs(data, node => treemap.push(node));

  setSelectedComp(-1);

  return (
    <Impress overviewOpen={true}>
      {slides.map((item, index) => (
        <Step
          x={treemap[index].x}
          y={treemap[index].y}
          key={index}
        >
          <Slide
            scale={0.8}
            hasBackground={false}
            content={item}
            key={item.id}
          />
        </Step>
      ))}
    </Impress>
  );
});
