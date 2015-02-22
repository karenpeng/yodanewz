(function (exports) {
  function speak(sentence, url, callback) {
    // if ('speechSynthesis' in window) {
    //   // You're good to go!
    //   tts(sentence, url, callback);
    // } else {
    //   // Ah man, speech synthesis isn't supported.
    //   console.log("OOOPS");
    //   audioTag(sentence, url);
    // }
    try {
      //tts('forever alone', 'http://reddit.com', tts, true);
      tts(sentence, url, callback);
    } catch (e) {
      console.log(e);
      audioTag(sentence, url, callback);
    }
  }

  function tts(sentence, url, callback, num) {

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voice = voices.filter(function (voice) {
      return voice.name == 'Ralph';
      //return voice.name == 'Trinoids';
      // return voice.name === 'Bad News';
      //return voice.name === 'Deranged';
      //return voice.name === 'Pipe Organ';
      //return voice.name === 'Whisper';
    })[0];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.8; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    //msg.text = 'Hello World';
    msg.text = sentence;
    msg.lang = 'en-US';

    msg.onend = function (e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    if (num !== undefined) {
      speechSynthesis.resume();
      return;
    }

    speechSynthesis.speak(msg);

    msg.onstart = function () {
      if (callback !== undefined) {
        callback(sentence, url);
        return;
      }
    };

    // console.log('isSafari ', isSafari);
    // console.log('isChrome ', isChrome);
    // console.log('isFirefox ', isFirefox);
    // console.log('isOpera ', isOpera);

    //just for safari
    if (isSafari) {
      callback(sentence, url);
    }
  }

  setTimeout(function () {
    tts('forever alone', 'http://reddit.com', tts, true)
  }, 1000);

  function audioTag(sentence, url, callback) {
    var postSentence = sentence.replace(/\s/g, '+');
    var mp3 = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", mp3);
    document.getElementById('voice').play();
    setTimeout(function () {
      callback(sentence, url);
    }, 1000);

  }

  exports.speak = speak;
})(this);