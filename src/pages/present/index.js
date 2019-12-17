import Slide from "../../components/Slide/index";
import router from "umi/router";
import Impress from "../../components/Impress/index";
import Step from "../../components/Step/index";
import treemap from "../../utils/treemap"
import { connect } from "dva";
import { useEffect } from "react";

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

  function copyTree(tree) {
    const data = { ...tree, children: [] };
    function eachBefore(node, data) {
      node.children &&
        node.children.forEach(item => {
          const child = { ...item, children: [] };
          data.children.push(child);
          eachBefore(item, child);
        });
    }
    eachBefore(tree, data);
    return data;
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
      width: screen.width * 0.8,
      height: screen.height * 0.8
    });
  });

  // 进行布局
  const map = treemap(tree);
  // const treemap = [];
  // const data = getLayout(screen.width, screen.height, tree);
  // dfs(data, node => treemap.push(node));

  setSelectedComp(-1);

  return (
    <Impress overviewOpen={true}>
      {slides.map((item, index) => (
        <Step
          // x={map[index].x}
          // y={map[index].y}
          // scale={map[index].scale}
          y={index * 2000}
          key={index}
        >
          <Slide
            // height={map[index].data.height}
            // width={map[index].data.width}
            
            // width={100}
            content={item}
            key={item.id}
          />
        </Step>
      ))}
    </Impress>
  );
});
