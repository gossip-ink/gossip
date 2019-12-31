# uIdea

一个快速创建炫酷效果的制作幻灯片的系统。

![QQ20191231-095430@2x.png](https://i.loli.net/2019/12/31/yOsPigBNSMAu5UY.png)

## 查看介绍的幻灯片

(1) 将 examples 里面的 introduction.uidea 下载到本地。
(2) 打开网址：https://pearmini.github.io/uIdea/
(3) 在工具中点击上传按钮，选择 introduction.uidea 上传。
(4) 点击放映按钮。

## 功能

这里大概介绍一下 uIdea 的独一无二的功能。

### ToolBar

你可以放映、保存当前 slides 到浏览器到缓存、新建幻灯片、下载幻灯片、上传幻灯片。

### Outline

在这里你可以约定式地创建幻灯片，也就是说你只负责写大纲（一棵树的形式），会根据大纲生成相应的 slides。

当你通过拖拽调整大纲的时候，相应的 slide 的顺序也会发生改变。

### Thumbnails

这是所有 slide 的缩略图。

### Structure

这里是每一个 slide 的结构，在这个面板你可以添加新的元素（图片、文字、代码）到你的 slide 里面。

### AttrPanel

在这里可以设置当前选中元素的一些属性。

### Variables

全局的属性变量。在这里你可以创建、删除和编辑属性变量，并且和当前选中元素的某一个属性关联起来，这些都是响应式的。

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
  "selectedComponentId": 1,
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
    "flex": "colum"
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
- flex
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
  { "id": 1, "type": "color", "value":"#bbbbbb", "name": "标题颜色" },
  {}
]
```

目前一种支持两种：

- color
- number

## TODO

- 界面优化
- 支持更多的属性变量
- slide 更多的样式
- slide 布局优化
- 更多的组件
- 操作更加的流畅：快捷键
- 更多的交互功能
  