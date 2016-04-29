const thinky = require('./config.js');

// Create the model
const Message = thinky.thinky.createModel('Messages', {
  channel: thinky.type.string(),
  user: thinky.type.object(),
  msg: thinky.type.string(),
  createdAt: thinky.type.date().default(thinky.r.now()),
  id: thinky.type.string(),
});

module.exports = Message;
