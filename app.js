var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var config = require('./config.json');
var urllib = require('urllib');
var unirest = require('unirest');
var Newz = require('./dbmodel.js');
var mongoose = require('mongoose');
var Twit = require('twit');
var wordNet = require('wordnet-magic');
var wn = wordNet();
var later = require('later');
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
var sched = later.parse.recur().on('03:50:00').time();
later.date.UTC();
var next = later.schedule(sched).next(10);
console.log(next);
later.setInterval(function () {
  action();
}, sched);

action();

function action() {
  getNews(function (data) {
    var title = data.title;
    var url = data.url;
    mkHashTag(title, function (hashTagsss) {
      var hashTags = hashTagsss;
      yoDa(title, function (result) {
        var str = result + hashTags;
        if (str.length > 140) {
          tweet(result);
        } else {
          tweet(str);
        }
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
  });
}

//var test = {};

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

function yoDa(sentence, callback) {
  //var postSentence = sentence.replace(/\W/g, '+');
  var postSentence = encodeURIComponent(sentence);
  //console.log('postsentence ' + postSentence);
  var url = 'https://yoda.p.mashape.com/yoda?sentence=' + postSentence;

  urllib.request(
    url, {
      method: 'GET',
      headers: {
        "X-Mashape-Key": config.keys.yodaKey
      }
    }, function (err, data, res) {
      if (err) {
        return console.error(err);
      }
      //console.log(data);
      var value = data.toString('utf-8');
      console.log(value);
      callback(value);
    }
  );
}

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