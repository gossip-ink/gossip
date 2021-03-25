import classNames from "classnames";
import React from "react";

export type ButtonType = "primary" | "normal" | "danger" | "warning" | "approve";

const typeClassNameMap: Record<ButtonType, string> = {
  primary: classNames(
    "text-gray-50 bg-blue-400 border border-blue-600",
    "hover:bg-blue-300 hover:border-blue-500",
    "active:bg-blue-500 active:border-blue-700"
  ),
  normal: classNames(
    "text-gray-800 bg-gray-200 border border-gray-400",
    "hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300",
    "active:bg-gray-300 active:border-gray-500"
  ),
  danger: classNames(
    "text-gray-50 bg-red-400 border border-red-600",
    "hover:bg-red-300 hover:border-red-500",
    "active:bg-red-500 active:border-red-700"
  ),
  warning: "",
  approve: classNames(
    "text-white bg-green-500 border border-green-600",
    "hover:bg-green-400 hover:border-green-500",
    "active:bg-green-600 active:border-green-700"
  ),
};

const Button: React.FC<ButtonProps> = ({ className, type = "normal", onClick, children }) => (
  <button
    className={classNames(
      "px-4 py-1 shadow-md rounded transition-colors duration-150 ease-in-out focus:outline-none",
      typeClassNameMap[type],
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

export type ButtonProps = React.PropsWithChildren<{
  className?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;
