import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const ChartNodeEditor: React.FC<ChartNodeEditorProps> = ({ node }) => {
  return <div>This is the an editor for ChartNode.</div>;
};

ChartNodeEditor.displayName = "ChartNodeEditor";

ChartNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.ChartNode>,
};

export default ChartNodeEditor;

export type ChartNodeEditorProps = { node: N.ChartNode };
