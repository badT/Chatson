const thinky = require('../config.js');

// Create the model
const Tone = thinky.thinky.createModel('Tones', {
  channel: thinky.type.string(),
  toneData: thinky.type.object(),
  createdAt: thinky.type.date().default(thinky.r.now()),
  id: thinky.type.string(),
});

// Tone.ensureIndex('user.user-id');
module.exports = Tone;
