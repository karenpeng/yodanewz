var newzSchema = mongoose.Schema('Newz', {
  "year": number,
  "month": number,
  "day": number,
  "saying": String,
  "url": String
});

var Newz = mongoose.model('Newz', newzSchema);

module.exports = Newz;