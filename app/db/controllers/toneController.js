const Tone = require('../schemas/toneSchema');
// const eventEmitter = require('../../utils/eventEmitter');


exports.saveTone = (tone) => {
  const newTone = new Tone(tone);
  newTone.save().then((result) => {
    // console.log('Tone saved:', result);
    console.log(result);
    return result;
  }).error((err) => {
    console.log('toneController error:', err);
  });
};

// Tone.changes().then((feed) => {
//   feed.each((error, doc) => {
//     if (error) {
//       console.log(error);
//       process.exit(1);
//     } else {
//       // console.log('changes feed: ', doc);
//       // eventEmitter.emit('toneUpdate', doc);
//     }
//   });
// }).error((error) => {
//   console.log(error);
//   process.exit(1);
// });
