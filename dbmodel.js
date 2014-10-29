var mongoose = require('mongoose');
var newzSchema = mongoose.Schema('Newz', {
  "index": {
    type: Number
  },
  "year": {
    type: String
  },
  "month": {
    type: String
  },
  "day": {
    type: String
  },
  "saying": {
    type: String
  },
  "url": {
    type: String
  }
});

var Newz = mongoose.model('Newz', newzSchema);

module.exports = Newz;