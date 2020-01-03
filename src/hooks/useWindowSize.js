import { useState, useEffect } from "react";

export default function() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({
        width: innerWidth,
        height: innerHeight
      });
    });
    return () => {
      window.removeEventListener("resize", this);
    };
  });
  return windowSize;
}
