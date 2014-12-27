var wordNet = require('wordnet-magic');
var wn = wordNet();

module.exports = mkHashTag;

function mkHashTag(sentence, callback) {
  var hashTags = '';
  var wordCount = 0;
  var resultCount = 0;
  var words = sentence.split(' ');
  words.forEach(function (word) {
    //console.log(word);
    var wordLow = word.toLowerCase();
    var pattern = /\w+/g;
    var result = pattern.exec(wordLow);
    //console.log(result[0]);
    if (result[0] !== null) {
      wordCount++;
      wn.isNoun(result[0], function (err, data) {
        if (err) {
          return console.error(err);
        }
        if (data === true) {
          //console.log(result[0] + ' is noun');
          hashTags += ('#' + result[0] + ' ');
        }
        resultCount++;
        if (resultCount === wordCount) {
          console.log(hashTags);
          callback(hashTags);
        }
      });
    }
  });
}