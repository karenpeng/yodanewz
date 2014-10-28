var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require("fs");
var bodyParser = require('body-parser');
var later = require('later');
var config = require('./config.json');
// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index.html');
});
app.get('/hello', function (req, res) {
  //console.log("yeah")
  action(function (result) {
    //console.log(result)
    res.send(result);
  });
});
app.listen(3000);

//action();
var schedule = {
  schedules: [{
    h: [23],
    m: [50]
  }]
};
// var sched = later.schedule(schedule);
// var t = later.setInterval(function () {
//   action();
// }, sched);

function action(callback) {
  // getNews(function (data) {
  //   yoDa(data.title, function (result) {
  //     tweet(result + data.url);
  //   });
  // });
  if (callback === null) {
    getNews(function (data) {
      yoDa(data.title, function (result) {
        tweet(result + data.url);
        //var record = new Newz()
        //save data here man!!!!!!!
        var date = new Date();
        var record = new Newz({
          "year": date.getFullYear(),
          "month": date.getMonth(),
          "day": date.getDate(),
          "saying": result,
          "url": data.url
        });
        record.save(function (err) {
          if (err) return console.error(err);
        });
      });
    });
  } else {
    getNews(function (data) {
      yoDa(data.title, function (result) {
        var forClient = {
          "result": result,
          "url": data.url
        };
        callback(forClient);
      });
    });
  }
}

function getNews(callback) {
  var urllib = require('urllib');
  var key = config.keys.nytimeKey;
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=' + key;
  urllib.request(url, {
    method: 'GET',
    dataType: 'json'
  }, function (err, data, res) {
    if (err) {
      console.error(err);
    }
    //just want one most popular article
    var rawData = {
      "url": data.results[0].url,
      "title": data.results[0].title
    };
    callback(rawData);
  });
}

function yoDa(sentence, callback) {
  var unirest = require('unirest');
  //var postSentence = sentence.replace(/ /g, '+');
  var postSentence = encodeURIComponent(sentence);
  //console.log(postSentence);
  var url = 'https://yoda.p.mashape.com/yoda?sentence=' + postSentence;
  unirest.get(url)
    .header("X-Mashape-Key", config.keys.yodaKey)
    .end(function (result) {
      //console.log(result.status, result.headers, result.body);
      callback(result.body);
    });

}

function tweet(something) {
  var Twit = require('twit');
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
      console.log(err);
    }
  });
}

var mongoose = require('mongoose');
mongoose.connect(config.keys.dbName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // yay!
  console.log('yay!');
});