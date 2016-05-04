const thinky = require('../config.js');

// Create the model
const Message = thinky.thinky.createModel('Messages', {
  channel: thinky.type.string(),
  user: thinky.type.object(),
  msg: thinky.type.string(),
  createdAt: thinky.type.date().default(thinky.r.now()),
  id: thinky.type.string(),
});

Message.ensureIndex('user.user-id');
// Test for feeds
// Message.changes().then((feed) => {
//   feed.each((error, doc) => {
//     if (error) {
//       console.log(error);
//       process.exit(1);
//     } else {
//       console.log('changes feed: ', doc);
//     }
//   });
// }).error((error) => {
//   console.log(error);
//   process.exit(1);
// });

module.exports = Message;
