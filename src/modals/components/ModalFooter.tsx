import classNames from "classnames";
import React from "react";

const ModalFooter: React.FC<ModalFooterProps> = ({ className, children }) => (
  <h2 className={classNames("bg-gray-50 border-t border-gray-200", className)}>{children}</h2>
);

ModalFooter.displayName = "ModalFooter";

export default ModalFooter;

export type ModalFooterProps = React.PropsWithChildren<{ className?: string }>;
