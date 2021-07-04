import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export type PortalProps = {
  getContainer: () => HTMLElement;
};

const Portal: React.FC<PortalProps> = ({ getContainer, children }) => {
  const containerRef = useRef<HTMLElement>();
  const initRef = useRef<boolean>(false);

  if (!initRef.current) {
    containerRef.current = getContainer();
    initRef.current = true;
  }

  useEffect(() => {
    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
};

export default Portal;
