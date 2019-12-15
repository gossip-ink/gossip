# uIdea

一种基于 json 的快速创建 ppt 的语法，同时提供一个用户界面。

## JSON 语法

### 大体结构

描述一个 PPT 的 json 的大体结构如下，一共有7个字段。

- filename: 文件名，会显示在标题栏。
- selectedId: 当前选中的 slide 的 id。
- selectedPanelId: 当前操作的面板的 id。
- selectedComponentId: 当前选中的组件的 id。
- structure: PPT 的大纲。
- components: 一个数组，每一个元素是一个 slide 的结构。
- attributeVars: 一个数组，存储着所有的属性变量。

```json
{
  "filename": "hello world",
  "selectedId": 1,
  "selectedPanelId": 1,
  "selectedComponentId": "c-4",
  "structure":{

  },
  "components":[],
  "attributeVars":[]
}
```

### structure

这里是 slides 间的关系，是一棵树。

```json
{
    "id": 1,
    "name": "uIdea",
    "children": [
      {
        "id": 2,
        "name": "快速构建",
        "children": [
          { "id": 3, "name": "思维导图" },
          { "id": 4, "name": "flex 布局" }
        ]
      },
      { "id": 5, "name": "更有交互性" }
    ]
}
```

### components

每一个 slide 都是一个 component，这是一也是一颗树。

```json
[
 {
  "id":1,
  "type": "panel",
  "value":"colum",
  "attrs":{
    "span":[1, 2],
    "flexDirection": "colum"
  },
  "children":[
    {
      "id":2,
      "type":"text",
      "value":"hello world",
      "attrs":{
        "fontSize":20,
        "fontColor":"#00000"
      }
    }
  ]
 }
]

```

目前一个有4种 component。

#### panel

主要用于布局，value 是当前的布局类型。

支持的属性有：

- backgroundColor
- flexDirection
- padding
  
#### text

主要用于显示文字，value 是当前显示的文字。

支持的属性有：

- fontSize
- color
- textAlign
- padding
- verticalAlign
- isTitle

#### image

主要用于显示图片，value 是当前图片的 url。

支持的属性有：

- displayMode
- padding

#### canvas

主要用于制作有交互性的东西，value 是当前的代码。

支持的属性：

- padding

API

```js
function(ctx, width, height){
  ctx.fillStyle = "yellow";
  ctx.fillRect(width / 2, height / 2, 10, 10)
}
```

### attributeVars

这里是属性变量。

```json
[
  { "id": 10, "type": "color", "value":"#bbbbbb", "name": "标题颜色" },
  {}
]
```

目前一种支持三种：

- color
- number
