function* idGenerator(){
  let nextId = -1;
  while(true){
    nextId++;
    yield nextId;
  }
}

const generator = idGenerator();

function nextId(){
  return generator.next().value;
}