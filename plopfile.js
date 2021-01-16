module.exports = function (plop) {
  plop.setGenerator("editor component", {
    description: "create a new editor component",
    prompts: [
      {
        type: "input",
        name: "typeName",
        message: "the name of node type, e.g. TextNode",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/editor/components/editors/{{typeName}}Editor.tsx",
        templateFile: "src/pages/editor/components/editors/template.tsx.hbs",
      },
      {
        type: "append",
        path: "src/pages/editor/components/editors/index.ts",
        template: 'export { default as {{typeName}}Editor } from "./{{typeName}}Editor";\n',
      },
    ],
  });
};
