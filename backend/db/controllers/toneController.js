const path = require('path');
const Tone = require('../schemas/toneSchema');


exports.saveTone = (tone) => {
  const newTone = new Tone(tone);
  newTone.save().then((result) => {
    console.log('Tone saved:', result);
  }).error((err) => {
    console.log('toneController error:', err);
  });
};
