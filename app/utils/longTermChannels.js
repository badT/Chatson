const eventEmitter = require('./eventEmitter');
const toneController = require('../db/controllers/toneController');
const watson = require('../watson/analyzer');

const storedMessages = {
  '#bacon_donut': [],
  '#wyld': [],
  '#giantwaffle': [],
  '#reynad27': [],
};

eventEmitter.on('chatMessage', message => {
  const incomingChannel = message.channel;
  const currentMessages = storedMessages[incomingChannel];
  // Checks to see if incomingChannel is a long term channel if so keeps the message
  if (currentMessages) {
    currentMessages.push(message.msg);
    // Check length of cached messages and processes through watson
    if (currentMessages.length > 200) {
      const arrayToText = { text: "'" + currentMessages.join('') + "'" };
      currentMessages.splice(0, currentMessages.length);
      watson.runAnalysis(arrayToText)
        .then((data) => {
          // Once watson returns it's promise stores the data in the db
          const newToneSet = {
            channel: incomingChannel,
            toneData: data.toneData,
          };
          toneController.saveTone(newToneSet);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
