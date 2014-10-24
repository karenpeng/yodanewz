// These code snippets use an open-source library. http://unirest.io/nodejs
var unirest = require('unirest');
unirest.get("https://yoda.p.mashape.com/yoda?sentence=Officials+Try+to+Trace+New+York+Ebola+Patient%E2%80%99s+Every+Contact")
  .header("X-Mashape-Key", "6gjKVLMkAWmshqBsBu01kIupbfiJp1Qu6dRjsn7iA42pUg8yV3")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  });