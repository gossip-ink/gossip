function isOverLap(wordA, wordB) {
  const xA = wordA.x + wordA.data.width;
  const yA = wordA.y + wordA.data.height;
  const xB = wordB.x + wordB.data.width;
  const yB = wordB.y + wordB.data.height;
  return !(xA < wordB.x || yA < wordB.y || xB < wordA.x || yB < wordA.y);
}

function hasOverLap(word, index, array) {
  return array.filter((_, i) => i < index).some((d) => isOverLap(d, word));
}

function allocate(word, index, array) {
  if (index === 0) {
    word.x = 0;
    word.y = 0;
    return;
  }
  let r = 10;
  let degree = 0;
  let cnt = 0;
  const increase = 400;
  do {
    word.x = Math.round(r * Math.sin((degree * Math.PI) / 180));
    word.y = Math.round(r * Math.cos((degree * Math.PI) / 180));
    degree += 1;
    cnt += 1;

    if (degree >= 360) {
      r += increase;
      degree = 0;
    }
  } while (hasOverLap(word, index, array));
}

export default function(nodes) {
  nodes.forEach(allocate);
  return nodes;
}
