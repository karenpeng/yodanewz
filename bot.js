var config = require('./config.json');
var Twit = require('twit');

module.exports = tweet;

function tweet(something) {
  var T = new Twit({
    consumer_key: config.keys.consumer_key,
    consumer_secret: config.keys.consumer_secret,
    access_token: config.keys.access_token,
    access_token_secret: config.keys.access_token_secret
  });
  T.post('statuses/update', {
    status: something
  }, function (err, data, res) {
    if (err) {
      return console.error(err);
    }
  });
}