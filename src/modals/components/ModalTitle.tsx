import classNames from "classnames";
import React from "react";

const ModalTitle: React.FC<ModalTitleProps> = ({ className, children }) => (
  <h2
    className={classNames(
      "font-medium text-xl bg-gray-50 text-gray-600 border-b border-gray-200",
      className
    )}
  >
    {children}
  </h2>
);

ModalTitle.displayName = "ModalTitle";

export default ModalTitle;

export type ModalTitleProps = React.PropsWithChildren<{ className?: string }>;
