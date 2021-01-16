import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";
import NodeEditor from "../NodeEditor";

const GridNodeEditor: React.FC<GridNodeEditorProps> = ({ node }) => {
  return (
    <div>
      {node.children.map((t) => (
        <NodeEditor key={t.id} node={t} />
      ))}
    </div>
  );
};

GridNodeEditor.displayName = "GridNodeEditor";

GridNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.GridNode>,
};

export default GridNodeEditor;

export type GridNodeEditorProps = { node: N.GridNode };
