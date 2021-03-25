import classNames from "classnames";
import React from "react";

const Modal: React.FC<ModalProps> = ({ className, children }) => (
  <div
    className={classNames(
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "bg-gray-100 rounded-lg shadow-xl border border-gray-400",
      className
    )}
  >
    {children}
  </div>
);

Modal.displayName = "Modal";

export default Modal;

export type ModalProps = React.PropsWithChildren<{ className?: string }>;
