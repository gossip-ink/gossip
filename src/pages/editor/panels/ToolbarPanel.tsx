import React from "react";
import { Link } from "react-router-dom";

export type ToolbarPanelProps = {};

const ToolbarPanel: React.FC<ToolbarPanelProps> = (props) => {
  return (
    <header className="px-6 w-full h-14 flex items-center bg-white border-b border-gray-200 shadow-sm">
      <Link to="/" className="font-brand text-3xl text-gray-900 translate-y-4">
        Gossip
      </Link>
    </header>
  );
};

export default ToolbarPanel;
