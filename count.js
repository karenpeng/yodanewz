function count(paragraph) {
  var wordnet = require('wordnet');
  paragraph.split(' ');
  wordnet.lookup('define', function (err, definitions) {

    definitions.forEach(function (definition) {
      console.log('  words: %s', words.trim());
      console.log('  %s', definition.glossary);
    });

  });
}

count("I love HTML5 Boilerplate and use it a lot as a basis for web projects. Sometimes however, I find it still does a little bit too much for my needs and I end up removing a lot before I can get started. Most importantly for me though, it still currently doesn’t support building with Google Closure Compiler which I tend to use both for it’s advanced code optimisations and for coding better Object-Oriented JavaScript (not to mention generating JavaScript documentation from the very same comments I write for the compiler). ");