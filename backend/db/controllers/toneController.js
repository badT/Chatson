const Tone = require('../schemas/toneSchema');


exports.saveTone = (tone) => {
  const newTone = new Tone(tone);
  newTone.save().then((result) => {
    // console.log('Tone saved:', result);
    return result;
  }).error((err) => {
    console.log('toneController error:', err);
  });
};

Tone.changes().then((feed) => {
  feed.each((error, doc) => {
    if (error) {
      console.log(error);
      process.exit(1);
    } else {
      console.log('changes feed: ', doc);
    }
  });
}).error((error) => {
  console.log(error);
  process.exit(1);
});
