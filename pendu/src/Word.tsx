const WORD_LIST = require('an-array-of-french-words');

for (let i = 0; i < WORD_LIST.length; i++) {
  if (WORD_LIST[i].length >= 10) {
    WORD_LIST.splice(i, 1);
  }
}

export default WORD_LIST;