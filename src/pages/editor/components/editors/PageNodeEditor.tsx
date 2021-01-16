import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";
import NodeEditor from "../NodeEditor";

const PageNodeEditor: React.FC<PageNodeEditorProps> = ({ node }) => {
  return (
    <div className="relative w-full h-full bg-gray-200">
      <div
        className="absolute top-1/2 left-1/2 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        style={{ width: "800px", height: "600px" }}
      >
        {node.children.map((t) => (
          <NodeEditor key={t.id} node={t} />
        ))}
      </div>
    </div>
  );
};

PageNodeEditor.displayName = "PageNodeEditor";

PageNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.PageNode>,
};

export default PageNodeEditor;

export type PageNodeEditorProps = { node: N.PageNode };
