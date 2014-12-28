var urllib = require('urllib');
var config = require('./config.json');
//var unirest = require('unirest');

module.exports = yoDa;

function yoDa(sentence, callback) {
  //var postSentence = sentence.replace(/\W/g, '+');
  var postSentence = encodeURIComponent(sentence);
  //console.log('postsentence ' + postSentence);
  var url = 'https://yoda.p.mashape.com/yoda?sentence=' + postSentence;
  urllib.request(
    url, {
      method: 'GET',
      // data: {
      //   'sentence': sentence
      // },
      dataType: 'text',
      headers: {
        "X-Mashape-Key": config.keys.yodaKey
      },
      timeout: 60000
    },
    function (err, data, res) {
      if (err) {
        return console.error(err);
      }
      //console.log(data);
      //console.log(data);
      callback(data);
    }
  );
  // unirest.get(url)
  //   .header("X-Mashape-Key", config.keys.yodaKey)
  //   .end(function (result) {
  //     console.log(result.status, result.headers, result.body);
  //   });
}