var urllib = require('urllib');

module.exports = getReddit;

function getReddit(callback) {
  var subReddit = Math.random() > 0.6 ? 'news' : 'showerthoughts';
  var url = 'http://api.reddit.com/r/' + subReddit + '/hot';
  urllib.request(url, {
    method: 'GET',
    dataType: 'json',
    timeout: 60000
  }, function (err, _data, res) {
    if (err) return console.error(err);
    var rawData;
    for (var i = 0; i < _data.data.children.length; i++) {
      if (_data.data.children[i].data.title.length <= 140) {
        rawData = {
          'title': _data.data.children[i].data.title,
          'url': _data.data.children[i].data.url
        };
        break;
      }
    }

    callback(rawData);
  });
}