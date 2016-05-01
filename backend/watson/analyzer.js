const watson = require('watson-developer-cloud');
const toneKey = require('../.appkeys.json');

const tone_analyzer = watson.tone_analyzer({
  username: toneKey.tone_analyzer.username,
  password: toneKey.tone_analyzer.password,
  version: 'v3-beta',
  version_date: '2016-02-11',
  sentences: 'false',
});

exports.getTone = (message) => {
  tone_analyzer.tone(message, (err, tone) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(JSON.stringify(tone, null, 2));
      console.log('should be going into toneCallback');
      toneCallback(tone);
    }
  });
};

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

  console.log(tone);
}
