const watson = require('watson-developer-cloud');
const toneKey = require('../.appkeys.json');
const toneController = require('../db/controllers/toneController');

const tone_analyzer = watson.tone_analyzer({
  username: toneKey.tone_analyzer.username,
  password: toneKey.tone_analyzer.password,
  version: 'v3-beta',
  version_date: '2016-02-11',
  sentences: 'false',
});

const storedMessages = [];

// Takes in the chat message, puts it into the storedMessages array,
// once there are enough messages converts it into a string watson tone
// analyzer will accept and calls getTone
exports.intoTones = (message) => {
  storedMessages.push(message.msg);
//  console.log(storedMessages);
  if (storedMessages.length === 10) {
    console.log('we hit 10 messages');
    const arrayToText = { text: "'" + storedMessages.join('') + "'" };
    getTone(arrayToText);
    storedMessages.splice(0, storedMessages.length);
  }
};

// Passes string text to watson for analysis
function getTone(message) {
  tone_analyzer.tone(message, (err, tone) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(JSON.stringify(tone, null, 2));
      toneCallback(tone);
    }
  });
}

 // Converts a tone category into a flat object with tone values
function getToneValues(toneCategory) {
  const tone = {
    id: toneCategory.category_id,
  };
  toneCategory.tones.forEach((toneValue) => {
    tone[toneValue.tone_id] = +((toneValue.score * 100).toFixed(2));
  });

  return tone;
}

// Converts a set of tones into flat objects
function getTones(tone) {
  const tones = {};
  tone.tone_categories.forEach((category) => {
    tones[category.category_id.split('_')[0]] = getToneValues(category);
  });
  return tones;
}

// Success callback for tone alaysis POST request
function toneCallback(data) {
  const tone = {
    document: {},
    sentence: {},
  };

  // Results for the updated full transcript's tone
  tone.document = getTones(data.document_tone);

  // Results for the latest sentence's tone
  // if (data.sentences_tone && data.sentences_tone[data.sentences_tone.length - 1].tone_categories.length)
  //     tone.sentence = getTones(data.sentences_tone[data.sentences_tone.length - 1]);

  console.log('inside toneCallback', tone);
  // calls rethinkdb and saves the tone results
  toneController.saveTone(tone);
}
