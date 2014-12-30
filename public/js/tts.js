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

  function tts(sentence, url, callback, num) {
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
      }
    };
  }

  tts('forever alone', 'http://reddit.com', tts, true);

  function audioTag(sentence, url) {
    var postSentence = sentence.replace(/\s/g, '+');
    var mp3 = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", mp3);
    document.getElementById('voice').play();
  }

  exports.speak = speak;
})(this);