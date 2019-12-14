import Slide from "../../components/Slide/index";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "dva";
import { useEffect } from "react";
import router from "umi/router";
import Impress from "../../components/Impress/index";
import Step from "../../components/Step/index";

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

  const windowSize = useWindowSize();

  // 按照顺序获得 slides
  const idList = [];
  dfs(structure, node => idList.push(node.id));
  const slideList = idList.map(item => components.find(cmp => cmp.id === item));

  setSelectedComp(-1);
  const zs = [0, -1000, -2000, -1000, 0];

  return (
    <Impress overviewOpen={true}>
      {slideList.map((item, index) => (
        <Step
          x={100}
          y={index * screen.height}
          z={zs[index]}
          rotate={index * 90}
          key={index}
        >
          <Slide
            height={screen.height * 0.8}
            width={screen.width * 0.8}
            content={item}
            key={item.id}
          />
        </Step>
      ))}
    </Impress>
  );
});
