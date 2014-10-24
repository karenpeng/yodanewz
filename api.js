function askForArticle() {
  var urllib = require('urllib');
  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1; //January is 0!
  // var yyyy = today.getFullYear();
  // if (dd < 10) {
  //   dd = '0' + dd;
  // }
  // if (mm < 10) {
  //   mm = '0' + mm;
  // }
  // today = yyyy.toString() + mm.toString() + dd.toString();
  //console.log(today);
  var key = '38ca745c014db64d4d8be1fc7dbfbc94:10:68849499';
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-section/1.json?offset=100&&api-key=' + key;
  urllib.request(url, function (err, data, res) {
    if (err) {
      throw err;
    }
    console.log(data.toString());
    // rawData = {
    //   "title": data.title,
    //   "abstract": data.abstract,

    // };
    count(data.abstract);
  });
}

askForArticle();