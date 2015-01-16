var urllib = require('urllib');

exports.getHackerNews = function (callback) {
  var topUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  urllib.request(topUrl, {
    method: 'GET',
    dataType: 'json',
    timeout: 60000
  }, function (err, data, res) {
    if (err) return console.error(err);
    exports.getShorTitleNews(data, 0, callback);
  });
}

exports.getShorTitleNews = function (data, index, callback) {
  var _data = data;
  var _index = index;
  var id = _data[_index];
  var itemUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty';
  urllib.request(itemUrl, {
    method: 'GET',
    dataType: 'json',
    timeout: 60000
  }, function (err, data, res) {
    if (err) return console.error(err);
    if (data.title.length <= 140) {
      var rawData = {
        'title': data.title,
        'url': data.url
      };
      callback(rawData);
    } else {
      _index++;
      getShorTitleNews(__data, _index);
    }
  });
}