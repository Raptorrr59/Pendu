const WORD_LIST = require('an-array-of-english-words');
const List: Array<String> = [];

for (let i = 0; i < 1000; i++) {
  List.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
}

export default List;