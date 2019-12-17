import { useEffect } from "react";
export default function({
  children,
  backgroundColor = "#efefef",
  overviewOpen = false
}) {
  useEffect(() => {
    // 初始化样式
    const body = document.getElementsByTagName("body")[0];
    const root = document.getElementById("impress");
    const canvas = document.getElementById("canvas");
    let isOveriew = false;
    let activeIndex = 0;
    root.style.perspective = "1000px";
    body.style.backgroundColor = backgroundColor;

    // 给每一个 step 添加监听器
    const steps = document.getElementsByClassName("step");

    [...steps].forEach((item, index) => {
      item.onclick = function() {
        if (isOveriew) {
          activeIndex = index;
          isOveriew = false;
        } else {
          activeIndex = (index + 1) % children.length;
        }
        const { props } = children[activeIndex];
        goto(props);
      };
    });

    // 添加所有的监听器
    function goto({ x = 0, y = 0, z = 0, scale = 1, rotate = 0 }) {
      setStyleOfSlide();
      root.style.transform = `scale(${1 / scale})`;
      root.style.perspective = `${scale * 1000}px`;
      canvas.style.transform = `rotate(${-rotate}deg) translate3d(${-x}px, ${-y}px, ${-z}px)`;
    }

    // 切换到第一个
    const { props } = children[0];
    props && goto(props);

    function next() {
      activeIndex =
        activeIndex === children.length - 1
          ? children.length - 1
          : activeIndex + 1;
      const { props } = children[activeIndex];
      goto(props);
    }

    function prev() {
      activeIndex = activeIndex === 0 ? 0 : activeIndex - 1;
      const { props } = children[activeIndex];
      goto(props);
    }

    function setStyleOfSlide() {
      const elements = document.getElementsByClassName("step");
      const slides = [...elements];
      slides.forEach((item, index) => {
        if (index === activeIndex) {
          item.style.opacity = 1;
        } else {
          item.style.opacity = 0.3;
        }
      });
    }

    function setOveriew() {
      const elements = document.getElementsByClassName("step");
      const slides = [...elements];
      slides.forEach((item, index) => {
        item.style.opacity = 1;
      });
    }

    function overview() {
      if (!overviewOpen) return;
      isOveriew = true;
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      children.forEach(item => {
        const { x = 0, y = 0 } = item.props;
        (maxX = Math.max(maxX, x)),
          (maxY = Math.max(maxY, y)),
          (minX = Math.min(minX, x)),
          (minY = Math.min(minY, y));
      });

      const x = (maxX + minX) / 2,
        y = (maxY + minY) / 2;

      // 找到可以包裹所有 step 的容器，然后移动并且 scale 过去
      const boxWidth = maxX - minX,
        boxHeight = maxY - minY;

      const scaleY = (boxHeight + screen.height) / screen.height,
        scaleX = (boxWidth + screen.width) / screen.width,
        scale = Math.max(scaleX, scaleY);

      const props = {
        x,
        y,
        scale: scale
      };
      goto(props);
      setOveriew();
    }

    // 导航的监听器
    const navigate = event => {
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
            prev();
            break;
          case 9: // tab
          case 32: // space
          case 34: // pg down
          case 39: // right
          case 40: // down
            next();
            break;
          case 8: // delete
            overview();
            break;
        }
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", navigate);
    return () => {
      window.removeEventListener("keydown", navigate);
    };
  });

  return (
    <div
      id="impress"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transformOrigin: "left top",
        transitionDuration: "1s",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        id="canvas"
        style={{
          position: "absolute",
          transformOrigin: "left top",
          transitionDuration: "1s",
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </div>
  );
}
