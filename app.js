var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var later = require('later');

var config = require('./serverJs/config.json');
var Newz = require('./serverJs/dbmodel.js');
var getNews = require('./serverJs/ynt.js');
var yoDa = require('./serverJs/yoda.js');
var tweet = require('./serverJs/bot.js');
var mkHashTag = require('./serverJs/hashTag.js');
var getReddit = require('./serverJs/reddit.js');
var getHackerNews = require('./serverJs/hackerNews.js').getHackerNews;

// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.listen(process.env.PORT || 3000);

mongoose.connect(config.keys.dbName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // yay!
  console.log('yay!');
});

app.get('/', function (req, res) {
  res.render('index.html');
});

// app.get('/test', function (req, res) {
//   res.send(test);
// });

app.get('/today', function (req, res) {
  //get the data from db
  var query = {};
  var selet = 'saying url';
  var option = {
    limit: 1,
    sort: {
      "date": -1
    }
  };
  Newz.findOne(query, selet, option, function (err, data) {
    if (err) {
      return console.error(err);
    }
    res.send(data);
  });
});

app.post('/search', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  //console.log(req.body.str);
  var query = {
    'date': req.body.str
  };
  var selet = 'saying url';
  Newz.findOne(query, selet, function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
    res.json(data);
  });
});

//UTC minus 4 equals to new york time
later.date.UTC();
var sched = later.parse.recur().on('03:50:00').time();
var next = later.schedule(sched).next(10); << << << < HEAD
console.log(next); === === =
//console.log(next);
>>> >>> > 364e b2e9c76bfc2fdd954fa60bf21c8cc3d1f1ba
later.setInterval(function () {
  action();
}, sched);

//action();

function action() {
  var ran = Math.random();

  if (ran < 0.4) {

    getNews(function (data) {
      var title = data.title;
      var url = data.url;
      //console.log('title ' + title);
      if (title.length + url.length < 140) {
        yodaandTweet(title, url);
      } else {
        yodaandTweet(title);
      }
    });

  } else if (ran < 0.8) {
    getHackerNews(function (data) {
      var title = data.title;
      var url = data.url;
      //console.log('title ' + title);
      if (title.length + url.length < 140) {
        yodaandTweet(title, url);
      } else {
        yodaandTweet(title);
      }
    });

  } else {
    getReddit(function (data) {
      var title = data.title;
      var url = data.url;
      //console.log(title, url);
      if (title.length + url.length < 140) {
        yodaandTweet(title, url);
      } else {
        yodaandTweet(title);
      }
    });
  }
}

function yodaandTweet(title, url) {
  mkHashTag(title, function (hashTagsss) {
    var hashTags = hashTagsss;
    console.log('hashTags ' + hashTags);
    yoDa(title, function (result) {
      //console.log(result);
      var str = result + hashTags;
      //console.log(str);
      if (result.length > 140) {
        tweet(title);
      } else if (str.length > 140) {
        tweet(result);
      } else {
        tweet(str);
      }
      // } else {
      //   tweet(result);
      // }
      var date = new Date();
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = yyyy.toString() + '/' + mm.toString() + '/' + dd.toString();
      var record = new Newz({
        "date": today,
        "saying": result,
        "url": url
      });
      record.save(function (err) {
        if (err) return console.error(err);
      });
    });
  });
}