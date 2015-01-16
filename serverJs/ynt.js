var urllib = require('urllib');
var config = require('./config.json');

module.exports = getNews;

function getNews(callback) {
  var key = config.keys.nytimeKey;
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=' + key;
  urllib.request(url, {
    method: 'GET',
    dataType: 'json'
  }, function (err, data, res) {
    if (err) {
      return console.error(err);
    }
    //just want one most popular article
    //test = data;
    var rawData = {
      "url": data.results[0].url,
      "title": data.results[0].title
    };
    //console.log(rawData.title);
    callback(rawData);
  });
}