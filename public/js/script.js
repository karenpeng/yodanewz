//$('#font1').hide();
//$('#showingNews').hide();

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
      sayIt(data);
    }
  });
}

function sayIt(data) {
  if (data === undefined) {
    var words = "On mars, the news seems to be, oooooops";
    say_show(words);
  } else {
    say_show(data.saying, data.url);
  }

  function say_show(sentence, url) {
    var postSentence = sentence.replace(/\s/g, '+');
    var mp3 = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", mp3);
    document.getElementById('voice').play();
    $('#news').removeAttr('id');
    $('#wrap').append('<span class="newz" id="news"></span>');
    $('#wrap').append('<span id="blinking">_</span>');
    for (var i = 0; i < sentence.length + 2; i++) {
      step(i, sentence, url);
    }
  }

  function step(num, sentence, url) {
    setTimeout(function () {
      dom(num, sentence, url);
    }, num * 100);
  }

  function dom(num, sentence, url) {
    if (num < sentence.length) {
      if (num === 0) {
        $("#news").append('<p></p>');
      }
      $('#news').append(sentence[num].toUpperCase());
    } else if (num === sentence.length) {
      if (url !== undefined) {
        $('<a id="link"></a>').insertAfter('#news');
        $('#link').attr('src', url);
        $('#link').html("[Hyperlink]");
      }
      asking = true;
    } else {
      ask();
    }
  }

  function ask() {
    $("#wrap").append('<p class="hintz" id="hints">-> NEWZ IN OTHER DATE, TYPE YYYY/MM/DD:</p><span class="typing" id="input"></span>');
    $('#blinking').remove();
    //$('<span id="blinking">_</span>').insertAfter($('#hints'));
    $("#wrap").append('<span id="blinking">_</span>');
    $('#news').removeAttr('id');
    $('#link').removeAttr('id');
  }
}

$(window).keydown(function (e) {
  if (asking) {
    e.preventDefault();
    if (e.which === 13) {
      var value = $('#input').html();
      var result = check(value);
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
    dataType: "json",
    error: function (err) {
      console.error(err);
    },
    success: function (data) {
      console.log(data);
      if (data === null) {
        sayIt();
      } else {
        sayIt(data);
      }
    }
  });
}