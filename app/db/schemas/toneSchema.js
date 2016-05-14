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

module.exports = Tone;
