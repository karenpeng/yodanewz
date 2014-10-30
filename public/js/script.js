//$('#font1').hide();
//$('#showingNews').hide();
//$('#askingForInput').hide();

// setTimeout(
//   function () {
//     $('#font1').show();
//   }, 600
// );
// setTimeout(
//   function () {
//     $('#font1').css('height', '40px');
//   }, 1200
// );
// setTimeout(
//   function () {
//     $('#font1').css('height', '56px');
//   }, 1800
// );
// setTimeout(
//   function () {
//     $('#font1').css('height', '76px');
//   }, 2400
// );
// setTimeout(
//   function () {
//     $('#font1').css('height', '110px');
//   }, 3000
// );
// setTimeout(
//   function () {
//     $('#showingNews').show();
//   }, 3600
// );
// setTimeout(
//   function () {
//     today();
//   }, 5500
// );

today();
var asking = false;

function today() {
  $.ajax({
    url: '/today',
    method: 'GET',
    dataType: 'json',
    error: function (err) {
      throw err;
    },
    success: function (data) {
      console.log(data);
      //var saying = encodeURIComponent(data.result);
      var postSentence = data.saying.replace(/\s/g, '+');
      var url = 'http://tts-api.com/tts.mp3?q=' + postSentence;
      $('#voice').attr("src", url);
      document.getElementById('voice').play();
      $('#link').attr("href", data.url);
      for (var i = 0; i < data.saying.length + 2; i++) {
        step(i);
      }

      function step(num) {
        setTimeout(function () {
          dom(num);
        }, num * 100);
      }

      function dom(num) {
        if (num < data.saying.length) {
          $('#news').append(data.saying[num].toUpperCase());
        } else if (num === data.saying.length) {
          $('#link').html("[Hyperlink]");
          asking = true;
        } else {
          $('#askingForInput').show();
          $('#blinking').remove();
          //$('<span id="blinking">_</span>').insertAfter($('#hints'));
          $("#askingForInput").append('<span id="blinking">_</span>');
          $('#news').removeAttr('id');
          $('#link').removeAttr('link');
        }
      }
    }
  });
}

$(window).keydown(function (e) {
  if (asking) {
    e.preventDefault();
    if (e.which === 13) {
      var value = $('#input').html();
      var result = check(value);
      console.log(value, result);
      if (result !== null) {
        askForNewz(result[0]);
      } else {
        //do the wtf engine here
      }
      $('#input').removeAttr('id');
      $('#blinking').remove();
    } else {
      if (e.which === 8 || e.which === 46) {
        var all = $('#input').html();
        var minus = all.slice(0, all.length - 1);
        $("#input").html(minus);
      } else {
        var key = e.which.toString();
        if (keycode[key]) {
          $('#input').append(keycode[key]);
        }
      }
    }
  }
});

function check(str) {
  var pattern = /\d\d\d\d\/\d\d\/\d\d/;
  var result = pattern.exec(str);
  return result;
}

function askForNewz(something) {
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {
      "str": something
    },
    dataType: "jsonp",
    error: function (err) {
      console.error(err);
    },
    success: function (data) {
      //do something;
      console.log(data.saying, data.url);
    }
  });
}