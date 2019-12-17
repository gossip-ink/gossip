const treeInput = {
  id: 1,
  data: {
    width: 1000,
    height: 800
  },
  children: [
    {
      id: 2,
      data: {
        width: 1000 * 0.9,
        height: 800 * 0.9
      }
    },
    {
      id: 3,
      data: {
        width: 1000 * 0.9,
        height: 800 * 0.9
      },
      children: [
        {
          id: 4,
          data: {
            width: 1000 * 0.8,
            height: 800 * 0.8
          }
        }
      ]
    }
  ]
};
let words = [];
let Width = 0;
let Height = 0;
let slide_ratio = 0.8; // 控制大小比例参数
let gap_ratio = 1.05; // 控制判断 overlap 的大小，相当于控制 slides 之间的 gap

function Word(id, width, height) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
}

function isOverLap(wordA, wordB) {
  const Ax = wordA.x + wordA.width; // right
  const Ay = wordA.y + wordA.height; // bottom
  const Bx = wordB.x + wordB.width;
  const By = wordB.y + wordB.height;

  return !(Ax < wordB.x || Ay < wordB.y || Bx < wordA.x || By < wordA.y);
}

function OverLapAll(wordA, words, len) {
  // 对已固定位置的单词，进行判断 Overlap
  let res = false;

  for (let i = 0; i < len; i++) {
    if (isOverLap(wordA, words[i])) {
      res = true;
      break;
    }
  }
  return res;
}
function allocate() {
  // 词云算法分配单词位置, x y 为画布中心
  // const x = Width / 2;
  // const y = Height / 2;

  const x = 0;
  const y = 0;


  //螺旋线每次向外旋转的距离
  const increase = 100;

  // 将第一个图放在最中间
  words[0].x = Math.round(x - words[0].width / 2);
  words[0].y = Math.round(y - words[0].height / 2);

  for (let i = 1; i < words.length; i++) {
    let r = 10;
    let degree = 0;

    do {
      words[i].x = Math.round(r * Math.sin((degree * Math.PI) / 180) + x);
      words[i].y = Math.round(r * Math.cos((degree * Math.PI) / 180) + y);
      degree += 1;

      if (degree >= 360) {
        r += increase;
        degree = 0;
      }
    } while (OverLapAll(words[i], words, i));
  }
}

function travel(tree) {
  // 遍历树,添加到 words 数组
  if (tree === undefined) return null;
  words.push(new Word(tree.id, tree.data.width, tree.data.height));

  if (tree.children === undefined) return null;
  for (let i = 0; i < tree.children.length; i++) {
    travel(tree.children[i]);
  }
}

function cal_ratio() {
  // 计算所有 slide 的缩放比例, 并按照比例修改所有输入的大小

  let all_area = 0;
  let canvas_area = Width * Height;

  for (let i = 0; i < words.length; i++) {
    all_area += words[i].width * words[i].height;
  }

  let ratio = (canvas_area / all_area) * slide_ratio;
  for (let i = 0; i < words.length; i++) {
    words[i].width = Math.round(words[i].width * ratio);
    words[i].height = Math.round(words[i].height * ratio);

    words[i].o_w = words[i].width * gap_ratio;
    words[i].o_h = words[i].height * gap_ratio;
  }
}

function output_tree(tree) {
  let output_tree = JSON.parse(JSON.stringify(tree));

  function travel(tree) {
    // 遍历输出树, 添加坐标和修改大小
    if (tree === undefined) return null;

    let id = tree.id;
    for (let i = 0; i < words.length; i++) {
      if (id === words[i].id) {
        // tree.width = words[i].width;
        // tree.height = words[i].height;
        tree.x = words[i].x;
        tree.y = words[i].y;
        break;
      }
    }

    if (tree.children === undefined) return null;
    for (let i = 0; i < tree.children.length; i++) {
      travel(tree.children[i]);
    }
  }

  travel(output_tree);
  return output_tree;
}
function initial(width, height, tree) {
  Width = width;
  Height = height;

  const c = document.getElementById("canvas");
  c.width = width;
  c.height = height;

  // 导入创建各个 slides 创建数组
  travel(tree);
  // 根据画布大小调整输入的各个 slides 大小
  // cal_ratio();
  // 布局
  allocate();
  // 绘制测试图
  draw_all();
  output(tree);
}

export default function(width, height, tree) {
  Width = width;
  Height = height;

  // 导入创建各个 slides 创建数组
  travel(tree);
  // console.log(words);
  // 根据画布大小调整输入的各个 slides 大小
  // cal_ratio();
  // 布局
  allocate();
  // 输出
  return output_tree(tree);
}
