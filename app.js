var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require("fs");
var later = require('later');
// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(__dirname + '/public'));

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
var sched = later.schedule(schedule);
var t = later.setInterval(function () {
  action();
}, sched);

function action(callback) {
  if (callback === null) {
    getNews(function (data) {
      yoDa(data.title, function (result) {
        tweet(result + data.url);
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
  var key = '27040b4bee6aa5cb4566382081236916:1:70052092';
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
    .header("X-Mashape-Key", "6gjKVLMkAWmshqBsBu01kIupbfiJp1Qu6dRjsn7iA42pUg8yV3")
    .end(function (result) {
      //console.log(result.status, result.headers, result.body);
      callback(result.body);
    });

}

function tweet(something) {
  var Twit = require('twit');
  var T = new Twit({
    consumer_key: 'BZjJkcThvUM8MXndMPaCqUXQL',
    consumer_secret: '2w1HLvIBVCNVOWHVNJMF7pSX9EO3DwV9IjfMpPsDdIEEr9GC0f',
    access_token: '2837844623-ZM3548SVpuVasKXBQFgTqUSOL8sLB2NOZmSfhza',
    access_token_secret: 'jPyWIKhr3yrju909DNeTXWxGHZ59IixRSkAvx3uWgVlTu'
  });
  T.post('statuses/update', {
    status: something
  }, function (err, data, res) {
    if (err) {
      console.log(err);
    }
  });
}