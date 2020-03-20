import url from "../static/images/灯泡.png";
const exampleURL = "https://i.loli.net/2020/03/18/g21ro4tTCAQ3nXO.jpg";

const defaultValues = {
  text: "hello world",
  image: exampleURL,
  canvas: `function(canvas, ctx, width, height){
    const size = 100,
      x = (width - size) / 2,
      y = (height - size) / 2;
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, size, size);
  }`
};
function createIdea(id, type) {
  return {
    id,
    type,
    value: defaultValues[type]
  };
}
// 创建组件
function createText(id, value = defaultValues.text, attrs) {
  return {
    id,
    value,
    type: "text",
    attrs: {
      fontSize: "$4",
      color: "$5",
      fontWeight: "normal",
      textAlign: "left",
      verticalAlign: "top",
      padding: 0,
      isTitle: false,
      ...attrs
    }
  };
}

function createImage(id, value = defaultValues.image, attrs) {
  return {
    type: "image",
    id,
    value,
    attrs: {
      displayMode: "normal",
      padding: 10,
      textAlign: "center",
      verticalAlign: "center",
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
      padding: 10,
      ...attrs
    },
    children
  };
}

function createCanvas(id, value = defaultValues.canvas, attrs) {
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

function createSlide(id, value, content = "介绍...") {
  return createPanel(
    id,
    "column",
    { span: [1, 2], backgroundColor: "$1", padding: "$6" },
    [
      createText("text" + id, value, {
        isTitle: true,
        fontSize: "$3",
        fontWeight: "bold",
        verticalAlign: "center"
      }),
      createPanel("panel" + id, "column", { span: [1] }, [
        createText("text2" + id, content, {
          isTitle: false
        })
      ])
    ]
  );
}

function createBigPoint(id, value) {
  return createPanel(
    id,
    "row",
    { span: [2, 1], backgroundColor: "$1", padding: "$6" },
    [
      createText("text" + id, value, {
        isTitle: true,
        fontSize: "$2",
        fontWeight: "bold",
        textAlign: "center",
        verticalAlign: "center"
      }),
      createPanel("panel" + id, "column", { span: [1] }, [
        createText("text2" + id, "这个观点很大...", {
          isTitle: false,
          textAlign: "left",
          verticalAlign: "center"
        })
      ])
    ]
  );
}

function createFile() {
  const name = "有趣的东西";
  return {
    filename: "new",
    selectedId: 1,
    selectedComponentId: 1,
    structure: {
      id: 1,
      name,
      children: [
        {
          name: "大观点A",
          id: 2,
          children: [
            {
              name: "小观点A",
              id: 4
            },
            {
              name: "小观点B",
              id: 5
            }
          ]
        },
        {
          name: "大观点B",
          id: 3
        }
      ]
    },
    components: [
      createPanel(
        1,
        "column",
        { span: [1.5, 1], backgroundColor: "$1", padding: "$6" },
        [
          createPanel(4, "row", { span: [3, 1] }, [
            createText(2, name, {
              fontSize: 180,
              isTitle: true,
              textAlign: "right",
              verticalAlign: "bottom",
              fontWeight: "bold",
              padding: 0
            }),
            createImage(5, url, {
              verticalAlign: "bottom",
              textAlign: "left",
              padding: 40
            })
          ]),
          createText(3, "伟大的创造者", {
            textAlign: "center",
            verticalAlign: "top"
          })
        ]
      ),
      createBigPoint(2, "大观点A"),
      createBigPoint(3, "大观点B"),
      createSlide(4, "小观点A", "这个观点很小..."),
      createSlide(5, "小观点B", "这个观点很小...")
    ],
    selectedArributeId: 1,
    attributeVars: [
      {
        id: 1,
        type: "color",
        value: "#ffffff",
        name: "背景颜色",
        canDelete: false
      },
      { id: 2, type: "number", value: 200, name: "大标题字号" },
      { id: 3, type: "number", value: 130, name: "小标题字号" },
      { id: 4, type: "number", value: 40, name: "内容字号" },
      { id: 5, type: "color", value: "#000000", name: "字体颜色" },
      { id: 6, type: "number", value: 60, name: "页面内边距" }
    ],
    ideas: [createText(6, "小想法"), createImage(7, exampleURL)]
  };
}

export {
  createCanvas,
  createImage,
  createPanel,
  createSlide,
  createText,
  createFile,
  createIdea
};
