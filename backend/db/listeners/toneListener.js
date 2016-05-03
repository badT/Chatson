const Tone = require('../db/schemas/toneSchema');

// Listens for changes to Tone table and console logs it
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
