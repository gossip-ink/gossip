import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const MarkdownNodeEditor: React.FC<MarkdownNodeEditorProps> = ({ node }) => {
  return <div>This is the an editor for MarkdownNode.</div>;
};

MarkdownNodeEditor.displayName = "MarkdownNodeEditor";

MarkdownNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.MarkdownNode>,
};

export default MarkdownNodeEditor;

export type MarkdownNodeEditorProps = { node: N.MarkdownNode };
