import styles from "./index.css";
import Slide from "../Slide/index";
import { connect } from "dva";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";
// useEffect(() => {
//   function keydown(e) {
//     const handlers = {
//       13: () => {}, //enter
//       9: () => {}, //tab
//       8: () => {}, // back space
//       38: () => {}, // up
//       40: () => {}, //down
//       37: () => {}, //left
//       39: () => {} //right
//     };

//     const handler = handlers[e.keyCode];
//     handler && handler();
//   }

//   if (selectedPanel === "outline") {
//     window.addEventListener("keydown", keydown);
//   }

//   return () => {
//     window.removeEventListener("keydown", keydown);
//   };
// });
export default connect(
  state => ({
    components: state.slides.components,
    structure: state.slides.structure,
    selectedId: state.slides.selectedId,
    selectedPanel: state.slides.selectedPanel
  }),
  {
    setSelected: id => ({ type: "slides/setSelected", payload: { id } }),
    setSelectedPanel: type => ({
      type: "slides/setSelectedPanel",
      payload: { type }
    }),
    deleteNode: id => ({ type: "slides/deleteNode", payload: { id } })
  }
)(function({
  height,
  components,
  structure,
  selectedId,
  setSelected,
  selectedPanel,
  setSelectedPanel,
  deleteNode,
  isDrag,
  setIsDrag
}) {
  function dfs(node, callback) {
    callback(node);
    node.children &&
      node.children.forEach(element => {
        dfs(element, callback);
      });
  }

  function getSlideById(id) {
    return components.find(item => item.id === id);
  }

  function handleSelect(id) {
    setSelected(id);
  }

  // 布局
  const windowSize = useWindowSize();
  const boxWidth = windowSize.width / 6,
    boxHeight = 120,
    scale = 0.1;
  const translateX = (boxWidth - windowSize.width) / 2,
    translateY = (boxHeight - windowSize.height) / 2;

  // 按照顺序获得 slides
  const idList = [];
  dfs(structure, node => idList.push(node.id));
  const nodes = idList.map(item => getSlideById(item));

  useEffect(() => {
    function keydown(e) {
      const handlers = {
        8: () => {
          if (selectedId === 1) {
            alert("第一张不能删除~");
            return;
          }
          deleteNode(selectedId);
        }, // back space
        38: () => {
          const node = nodes.find(item => item.id === selectedId);
          const index = nodes.indexOf(node);
          if (index === 0) return;
          setSelected(nodes[index - 1].id);
        }, // up
        40: () => {
          const node = nodes.find(item => item.id === selectedId);
          const index = nodes.indexOf(node);
          if (index === nodes.length - 1) return;
          setSelected(nodes[index + 1].id);
        } //down
      };

      const handler = handlers[e.keyCode];
      handler && handler();
    }

    if (selectedPanel === 1) {
      // window.addEventListener("keydown", keydown);
    }

    return () => {
      // window.removeEventListener("keydown", keydown);
    };
  });

  return (
    <div
      style={{
        height
        // border: selectedPanel === 1 && "1px solid black"
      }}
      className={styles.container}
      onClick={() => {
        setSelectedPanel(1);
      }}
    >
      <div style={{ height: boxHeight * nodes.length, overflow: "hidden" }}>
        {nodes.map(item => (
          <div
            key={item.id}
            style={{
              height: boxHeight,
              width: boxWidth
            }}
          >
            <div onClick={() => handleSelect(item.id)}>
              <Slide
                height={windowSize.height}
                width={windowSize.width}
                translateX={translateX}
                translateY={translateY}
                scale={scale}
                content={item}
                selected={selectedId === item.id}
                selectable={true}
                isDrag={isDrag}
                setIsDrag={setIsDrag}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
