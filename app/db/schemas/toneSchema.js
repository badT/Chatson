const thinky = require('../config.js');

// Create the model
const Tone = thinky.thinky.createModel('Tones', {
  channel: thinky.type.string(),
  messageCount: thinky.type.number(),
  // toneData: thinky.type.object(),
  emos: {
    anger: thinky.type.number(),
    disgust: thinky.type.number(),
    fear: thinky.type.number(),
    joy: thinky.type.number(),
    sadness: thinky.type.number(),
    agreeableness: thinky.type.number(),
    conscientiousness: thinky.type.number(),
    extraversion: thinky.type.number(),
    neuroticism: thinky.type.number(),
    openness: thinky.type.number(),
  },
  createdAt: thinky.type.date().default(thinky.r.now()),
  id: thinky.type.string(),
});

Tone.ensureIndex('channel');

// Tone.pre('save', function (next) {
//   console.log('presave', this);
//   if (this.messageCount === 1) {
//     next();
//   } else {
//     Tone.filter({ channel: this.channel }).run().then((data) => {
//       // update with current data
//       // loop over keys in emotion data
//         // take current value, multiply by current count
//         // add new value divide by count +1
//         // save to this.emo.whatever
//       // increase this.count by 1
//       data;
//       console.log('tonecontroller', data);
//     });
//     this.messageCount = 10;
//     next();
//   }
// });

module.exports = Tone;
