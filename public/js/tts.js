(function (exports) {
  function speak(sentence, url, callback) {
    if ('speechSynthesis' in window) {
      // You're good to go!
      tts(sentence, url, callback);
    } else {
      // Ah man, speech synthesis isn't supported.
      audioTag(sentence, url);
    }
  }

  function tts(sentence, url, callback) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voice = voices.filter(function (voice) {
      return voice.name == 'Ralph';
      //return voice.name == 'Trinoids';
    })[0];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    //msg.text = 'Hello World';
    msg.text = sentence;
    msg.lang = 'en-US';

    msg.onend = function (e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);

    msg.onstart = function () {
      if (callback) {
        callback(sentence, url);
      }
    };
  }

  function audioTag(sentence, url) {
    var postSentence = sentence.replace(/\s/g, '+');
    var mp3 = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", mp3);
    document.getElementById('voice').play();
  }

  function test() {
    var msgs = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msgs.voice = voices[10]; // Note: some voices don't support altering params
    msgs.voice = voices.filter(function (voice) {
      return voice.name == 'Ralph';
      //return voice.name == 'Trinoids';
    })[0];
    msgs.voiceURI = 'native';
    msgs.volume = 1; // 0 to 1
    msgs.rate = 1; // 0.1 to 10
    msgs.pitch = 2; //0 to 2
    msgs.text = 'Hello World';
    msgs.lang = 'en-US';

    speechSynthesis.speak(msgs);

  }
  exports.test = test;

  exports.speak = speak;
})(this);