var mongoose = require('mongoose');
var newzSchema = mongoose.Schema({
  'date': {
    type: String
  },
  'saying': {
    type: String
  },
  'url': {
    type: String
  }
});

newzSchema.index({
  master_id: 1,
  date: 1
});
module.exports = mongoose.model('Newz', newzSchema);