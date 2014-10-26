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
  var key = '27040b4bee6aa5cb4566382081236916:1:70052092';
  var url = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=' + key;
  urllib.request(url, function (err, data, res) {
    if (err) {
      //throw err;
    }
    console.log(data.toString());
    // rawData = {
    //   "title": data.title,
    //   "abstract": data.abstract,

    // };
    //count(data.abstract);
  });
}

askForArticle();