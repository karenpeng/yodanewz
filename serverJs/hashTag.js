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
    //var result = pattern.exec(wordLow);
    //the result of exec will be:
    //[ 'a', index: 0, input: 'a' ]
    // [ 'boy', index: 0, input: 'boy' ]
    // [ 'in', index: 0, input: 'in' ]
    // [ 'isis', index: 0, input: 'isis.' ]
    // [ 'a', index: 0, input: 'a' ]
    // [ 'suicide', index: 0, input: 'suicide' ]
    // [ 'vest', index: 0, input: 'vest.' ]
    // [ 'a', index: 0, input: 'a' ]
    // [ 'hope', index: 0, input: 'hope' ]
    // [ 'to', index: 0, input: 'to' ]
    // [ 'live', index: 0, input: 'live.' ]
    var result = wordLow.match(pattern);
    //the result of match will be:
    //[ 'a' ]
    // [ 'boy' ]
    // [ 'in' ]
    // [ 'isis' ]
    // [ 'a' ]
    // [ 'suicide' ]
    // [ 'vest' ]
    // [ 'a' ]
    // [ 'hope' ]
    // [ 'to' ]
    // [ 'live' ]

    //console.log(result);
    if (result !== null) {
      // wordCount++;
      // wn.isNoun(result[0], function (err, data) {
      //   if (err) {
      //     return console.error(err);
      //   }
      //   if (data === true) {
      //     //console.log(result[0] + ' is noun');
      //     hashTags += ('#' + result[0] + ' ');
      //   }
      //   resultCount++;
      //   if (resultCount === wordCount) {
      //     console.log(hashTags);
      //     callback(hashTags);
      //   }
      // });
      result.forEach(function (word) {
        if (word !== null) {
          wordCount++;
        }
      });
      result.forEach(function (word) {
        if (word !== null) {
          wn.isVerb(word, function (err, data) {
            if (err) return console.error(err);
            if (data === true) {
              hashTags += ('#' + word + ' ');
            }
            resultCount++;
            if (resultCount === wordCount) {
              callback(hashTags);
            }
          });
        }
      });
    }
  });
}