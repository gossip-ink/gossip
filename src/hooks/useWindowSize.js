import { useState, useEffect } from "react";

export default function() {
  const [windowSize, setWindowSize] = useState({
    width: screen.availWidth,
    height: screen.availHeight
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      const { innerWidth, innerHeight } = window;
      const { width, height } = screen;
      if (innerHeight === height && innerWidth === width) {
        setWindowSize({
          width: innerWidth,
          height: innerHeight
        });
      }
    });
    return () => {
      window.removeEventListener("resize", this);
    };
  });
  return windowSize;
}
