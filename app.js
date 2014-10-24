var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.json(rawData);
});
app.listen(3000);

var fs = require("fs");
var later = require('later');
var rawData;