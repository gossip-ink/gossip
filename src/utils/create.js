// 创建组件
function createText(id, value, attrs) {
  return {
    id,
    value,
    type: "text",
    attrs: {
      fontSize: 50,
      color: "#000000",
      fontWeight: "normal",
      fontFamily: "",
      textAlign: "left",
      verticalAlign: "top",
      padding: 50,
      isTitle: false,
      ...attrs
    }
  };
}

function createImage(id, value, attrs) {
  return {
    type: "image",
    id,
    value: value,
    attrs: {
      displayMode: "normal",
      padding: 10,
      ...attrs
    }
  };
}

function createPanel(id, value, attrs, children = []) {
  return {
    type: "panel",
    id,
    value,
    attrs: {
      span: [],
      flex: value,
      backgroundColor: "#fffff",
      padding: 10,
      ...attrs
    },
    children
  };
}

function createCanvas(id, value, attrs) {
  return {
    type: "canvas",
    id,
    value,
    attrs: {
      padding: 10,
      ...attrs
    }
  };
}

function createSlide(id, value) {
  return createPanel(id, "column", { span: [1, 2] }, [
    createText("text" + id, value, {
      isTitle: true,
      fontSize: "80",
      fontWeight: "bold"
    }),
    createPanel("panel" + id, "column", {}, [])
  ]);
}

function createFile() {
  const name = "uIdea";
  return {
    filename: "new",
    selectedId: 1,
    selectedComponentId: 1,
    structure: {
      id: 1,
      name
    },
    components: [
      createPanel(1, "column", { span: [1] }, [
        createText(2, name, {
          fontSize: 200,
          isTitle: true,
          textAlign: "center",
          verticalAlign: "center"
        })
      ])
    ],
    selectedArributeId: 1,
    attributeVars: [
    ]
  };
}

export {
  createCanvas,
  createImage,
  createPanel,
  createSlide,
  createText,
  createFile
};
