var hint = document.getElementById('hint');
hint.style.display = 'none';

$.ajax({
  url: '/hello',
  method: 'GET',
  dataType: 'json',
  error: function (err) {
    throw err;
  },
  success: function (data) {
    console.log(data);
    //var saying = encodeURIComponent(data.result);
    var postSentence = data.result.replace(/ /g, '+');
    var url = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    document.getElementById('voice').setAttribute("src", url);
    document.getElementById('voice').play();
    document.getElementById('link').setAttribute("href", data.url);
    for (var i = 0; i < data.result.length + 2; i++) {
      step(i);
    }

    function step(num) {
      setTimeout(function () {
        blah(num);
      }, num * 100);
    }

    function blah(num) {
      if (num < data.result.length) {
        $('#newz').append(data.result[num].toUpperCase());
      } else if (num === data.result.length) {
        document.getElementById('link').innerHTML = "[Hyperlink]";
      } else {
        hint.style.display = 'block';
      }
    }
  }
});