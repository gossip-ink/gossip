import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const CodeNodeEditor: React.FC<CodeNodeEditorProps> = ({ node }) => {
  return <div>This is the an editor for CodeNode.</div>;
};

CodeNodeEditor.displayName = "CodeNodeEditor";

CodeNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.CodeNode>,
};

export default CodeNodeEditor;

export type CodeNodeEditorProps = { node: N.CodeNode };
