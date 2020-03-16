import classNames from "./index.css";
import { connect } from "dva";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import router from "umi/router";

import Slide from "../../components/Slide";
import Impress from "../../components/Impress";
import Step from "../../components/Step";

import getLayout from "../../utils/overview";
import tree, { descendant, dfs, copyTree } from "../../utils/tree";

export default connect(
  state => ({
    structure: state.slides.structure,
    components: state.slides.components
  }),
  {
    setSelectedComp: id => ({ type: "slides/setSelectedComp", payload: { id } })
  }
)(function({ structure, components }) {
  const { width, height } = useWindowSize();
  // 进行布局
  const newTree = copyTree(structure);
  dfs(newTree, node => {
    Object.assign(node, {
      data: {
        width,
        height
      }
    });
  });

  const pos = descendant(getLayout(newTree));

  // 按照顺序获得 slides
  const slides = tree(structure).map(({ id, depth }) => {
    const cmp = components.find(item => item.id === id);
    const { x, y } = pos.find(item => item.id === id);
    return {
      content: cmp,
      x,
      y,
      scale: Math.max(1 - depth * 0.15, 0.5),
      z: depth * -1000
    };
  });

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
        {slides.map(({ x, y, z, content, scale }) => (
          <Step x={x} y={y} z={z} scale={scale} key={content.id}>
            <div
              style={{
                transform: "scale(0.85)"
              }}
            >
              <Slide content={content} />
            </div>
          </Step>
        ))}
      </Impress>
    </div>
  );
});
