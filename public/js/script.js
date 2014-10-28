$('#askingForInput').hide();

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
    var postSentence = data.result.replace(/\s/g, '+');
    var url = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", url);
    document.getElementById('voice').play();
    $('#link').attr("href", data.url);
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
        $('#news').append(data.result[num].toUpperCase());
      } else if (num === data.result.length) {
        $('#link').html("[Hyperlink]");
      } else {
        $('#askingForInput').show();
        $('#blinking').remove();
        $('<span id="blinking">_</span>').insertAfter($('#hints'));
        $('#news').removeAttr('id');
        $('#link').removeAttr('link');
      }
    }
  }
});