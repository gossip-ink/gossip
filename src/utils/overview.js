// 用于布局
let words = [];
const increase = 400; //螺旋线每次向外旋转的距离

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
  let rate = 10;

  // 将第一个图放在最中间
  words[0].x = Math.round(-words[0].width / 2);
  words[0].y = Math.round(-words[0].height / 2);

  // 螺旋线当前运行的参数
  let x = 0;
  let y = 0;

  let r = 10;
  let degree = 0;

  for (let i = 1; i < words.length; i++) {
    do {
      x = Math.round(r * Math.sin((degree * Math.PI) / 180));
      y = Math.round(r * Math.cos((degree * Math.PI) / 180));

      words[i].x = x;
      words[i].y = y;
      degree += 1;

      if (degree >= 360) {
        r += increase;
        degree = 0;
      }
    } while (OverLapAll(words[i], words, i));
  }
}

export default function(nodes) {
  words = nodes.map(d => new Word(d.content.id, d.data.width, d.data.height));
  allocate();
  return nodes.map((d, index) => ({
    ...d,
    x: words[index].x,
    y: words[index].y
  }));
}
