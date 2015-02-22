(function (exports) {
  $('#font1').hide();
  $('#showingNews').hide();
  var asking = false;

  setTimeout(
    function () {
      $('#font1').show();
    }, 600
  );
  setTimeout(
    function () {
      $('#font1').css('height', '40px');
    }, 1200
  );
  setTimeout(
    function () {
      $('#font1').css('height', '56px');
    }, 1800
  );
  setTimeout(
    function () {
      $('#font1').css('height', '76px');
    }, 2400
  );
  setTimeout(
    function () {
      $('#font1').css('height', '110px');
    }, 3000
  );
  setTimeout(
    function () {
      $('#showingNews').show();
    }, 3600
  );
  setTimeout(
    function () {
      today();
    }, 5500
  );

  function sayIt(data) {
    if (data === 'mars') {
      var words = "On mars, the newz seems to be, oooooops";
      speak(words, null, show);
    } else if (data === 'wtf') {
      var a = Math.floor(Math.random() * A.length);
      var b = Math.floor(Math.random() * B.length);
      var c = Math.floor(Math.random() * C.length);
      var sigh = Math.random() > 0.5 ? '. ummmmm' : '. yesssssssss.';
      var wtf = A[a] + ' + ' + B[b] + ' = ' + C[c] + sigh;
      var wtf2 = A[a] + ' plus ' + B[b] + ' = ' + C[c] + sigh;
      speak(wtf2, null, show);
    } else {
      speak(data.saying, data.url, show);
    }
  }

  function show(sentence, url) {
    $('#news').removeAttr('id');
    $('#wrap').append('<span class="newz" id="news"></span>');
    $('#wrap').append('<span id="blinking">.</span>');
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
      if (url !== null) {
        $('#wrap').append('<a id="link" target="_blank"></a>');
        $('#link').attr('href', url);
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
    $("#wrap").append('<span id="blinking">.</span>');
    $('#news').removeAttr('id');
    $('#link').removeAttr('id');
  }

  $(window).keydown(function (e) {
    if (asking) {
      if (e.which === 13) {
        e.preventDefault();
        var value = $('#input').html();
        var result = check(value);
        if (result !== null) {
          askForNewz(result[0]);
        } else {
          sayIt('wtf');
        }
        $('#input').removeAttr('id');
        $('#blinking').remove();
      } else {
        if (e.which === 8 || e.which === 46) {
          e.preventDefault();
          var all = $('#input').html();
          var minus = all.slice(0, all.length - 1);
          $("#input").html(minus);
        } else {
          var key = e.which.toString();
          if (keycode[key] !== undefined) {
            e.preventDefault();
            $('#input').append(keycode[key].toUpperCase());
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
          sayIt('mars');
        } else {
          sayIt(data);
        }
      }
    });
  }

})(this);