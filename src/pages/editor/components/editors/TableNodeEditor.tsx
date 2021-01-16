import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const TableNodeEditor: React.FC<TableNodeEditorProps> = ({ node }) => {
  return <div>This is the an editor for TableNode.</div>;
};

TableNodeEditor.displayName = "TableNodeEditor";

TableNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.TableNode>,
};

export default TableNodeEditor;

export type TableNodeEditorProps = { node: N.TableNode };
