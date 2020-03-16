import classNames from "./index.css";
import { connect } from "dva";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import router from "umi/router";

import Slide from "../../components/Slide";
import Impress from "../../components/Impress";
import Step from "../../components/Step";
import tree from "../../utils/tree";
import overview from "../../utils/overview";

export default connect(state => ({
  structure: state.slides.structure,
  components: state.slides.components
}))(function({ structure, components }) {
  const { width, height } = useWindowSize();

  const slideScale = 0.85;
  const angles = [90, 0, -90, 0];
  let cur = -1;
  let preAngle = 0;
  const nodes = tree(structure);

  const nodesWidthData = nodes.map((node, index) => {
    const cmp = components.find(item => item.id === node.id);
    const w = width * (1 + node.depth * 0.1),
      h = height * (1 + node.depth * 0.1);
    let rotate = 0;
    if (index) {
      const preNode = nodes[index - 1];
      if (node.depth === preNode.depth) rotate = angles[++cur % angles.length];
      else rotate = preAngle;
    }
    preAngle = rotate;
    return {
      ...node,
      content: cmp,
      rotate,
      scale: Math.max(1 - node.depth * 0.15, 0.5),
      z: node.depth * -1000,
      data: {
        width: rotate ? h : w,
        height: rotate ? w : h
      }
    };
  });

  const slides = overview(nodesWidthData).map(
    ({ x, y, rotate, scale, ...rest }) => {
      let actualX = x,
        actualY = y;
      if (rotate) {
        actualX -= (height * slideScale * scale) / 2;
        actualY += (width * slideScale * scale) / 2;
      }
      return {
        x: actualX,
        y: actualY,
        rotate,
        ...rest
      };
    }
  );

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
        {slides.map(({ x, y, z, rotate, content, scale }) => (
          <Step
            x={x}
            y={y}
            z={z}
            scale={scale}
            rotate={rotate}
            key={content.id}
          >
            <div
              style={{
                transform: `scale(${slideScale})`
              }}
            >
              <Slide content={content} hasBorder={false} />
            </div>
          </Step>
        ))}
      </Impress>
    </div>
  );
});
