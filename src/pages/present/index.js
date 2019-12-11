import styles from "./index.css";
import Slide from "../../components/Slide/index";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "dva";
import { useEffect } from "react";
import router from "umi/router";
import impress from "../../lib/impress";

export default connect(state => ({
  structure: state.slides.structure,
  components: state.slides.components
}))(function({ structure, components }) {
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

  function keyDownEvent(event) {
    if (
      event.keyCode == 8 ||
      event.keyCode == 9 ||
      event.keyCode === 27 ||
      (event.keyCode >= 32 && event.keyCode <= 34) ||
      (event.keyCode >= 37 && event.keyCode <= 40)
    ) {
      switch (event.keyCode) {
        case 33: // pg up
        case 37: // left
        case 38: // up
          impress().prev();
          break;
        case 9: // tab
        case 32: // space
        case 34: // pg down
        case 39: // right
        case 40: // down
          impress().next();
          break;
        case 8: // delete
          impress().goto(document.getElementById("overview"));
          break;
        case 27:
          router.push("/");
          break;
      }

      event.preventDefault();
    }
  }

  function clickURLEvent(event) {
    // event delegation with "bubbling"
    // check if event target (or any of its parents is a link)
    var target = event.target;
    while (target && target.tagName != "A" && target != document.body) {
      target = target.parentNode;
    }

    if (target && target.tagName == "A") {
      var href = target.getAttribute("href");

      // if it's a link to presentation step, target this step
      if (href && href[0] == "#") {
        target = document.getElementById(href.slice(1));
      }
    }

    if (impress().goto(target)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  function clickSlideEvent(event) {
    var target = event.target;
    // find closest step element
    while (
      target &&
      target.classList &&
      !target.classList.contains("step") &&
      target != document.body
    ) {
      target = target.parentNode;
    }

    if (impress().goto(target)) {
      event.preventDefault();
    }
  }

  const windowSize = useWindowSize();

  // 按照顺序获得 slides
  const idList = [];
  dfs(structure, node => idList.push(node.id));
  const slideList = idList.map(item => getSlideById(item));

  useEffect(() => {
    document.addEventListener("keydown", keyDownEvent, false);
    document.addEventListener("click", clickURLEvent, false);
    document.addEventListener("click", clickSlideEvent, false);
    return () => {
      document.removeEventListener("click", keyDownEvent);
      document.removeEventListener("keydown", clickURLEvent);
      document.removeEventListener("click", clickSlideEvent);
    };
  });

  return (
    <div id="impress">
      {slideList.map((item, index) => {
        const params = {
          "data-x": 0,
          "data-y": 0,
          "data-z": 0,
          "data-rotate": 0,
          "data-scale": 0
        };
        return (
          <Slide
            height={windowSize.height}
            width={windowSize.width}
            content={item}
            key={item.id}
            params={params}
          />
        );
      })}
      <div id="overview"></div>
    </div>
  );
});
