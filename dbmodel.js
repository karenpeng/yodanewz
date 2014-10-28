var mongoose = require('mongoose');
mongoose.connect('mongodb:..localhost/test');
var Newz = mongoose.model('Newz', {
  "title": String,
  "url": String
});