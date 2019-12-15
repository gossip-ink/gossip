import imageURL from "../static/example.jpg";
export default {
  filename: "hello world",
  selectedId: 1,
  selectedComponentId: "c-1",
  structure: {
    id: 1,
    name: "uIdea",
    children: [
      {
        id: 2,
        name: "快速构建"
      },
      {
        id: 3,
        name: "炫酷效果",

        children: [
          {
            id: 4,
            name: "词云模式"
          },
          {
            id: 5,
            name: "动画切换"
          }
        ]
      }
    ]
  },
  selectedArributeId: 10,
  attributeVars: [
    {
      id: 10,
      type: "color",
      value: "#bbbbbb",
      name: "标题颜色"
    }
  ],
  components: [
    {
      id: 1,
      type: "panel",
      value: "column",
      attrs: {
        span: [1, 2],
        flex: "column"
      },
      children: [
        {
          type: "text",
          value: "uIdea",
          id: "c-1",
          attrs: {
            color: "#161DC6",
            fontSize: 200
          }
        },
        {
          type: "panel",
          value: "row",
          id: "c-2",
          attrs: { span: [1, 1], flex: "row" },
          children: [
            {
              type: "image",
              id: "c-3",
              value: imageURL
            },
            {
              type: "canvas",
              id: "c-4",
              value:
                'function(ctx, width, height){\n\tctx.fillStyle = "black";\n\tctx.fillRect(0, 0, 100, 100);\n}'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      type: "panel",
      value: "column",
      attrs: {
        flex: "column"
      }
    },
    {
      id: 3,
      type: "panel",
      value: "column",
      attrs: {
        flex: "column"
      }
    },
    {
      id: 4,
      type: "panel",
      value: "column",
      attrs: {
        flex: "column"
      }
    },
    {
      id: 5,
      type: "panel",
      value: "column",
      attrs: {
        flex: "column"
      }
    }
  ]
};