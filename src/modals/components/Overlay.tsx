import React from "react";

const Overlay: React.FC<OverlayProps> = ({ className, onClick }) => {
  return (
    <button
      className={`block absolute top-0 right-0 w-screen h-screen bg-gray-400 ${className} cursor-default dark:bg-gray-500`}
      onClick={onClick}
    />
  );
};

Overlay.displayName = "Overlay";

export default Overlay;

export type OverlayProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
