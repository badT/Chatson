const eventEmitter = require('./eventEmitter');
const toneController = require('../db/controllers/toneController');
const watson = require('../watson/analyzer');

const storedMessages = {
  '#bacon_donut': [],
  '#wyld': [],
  '#ZiggyDLive': [],
  '#reynad27': [],
};
console.log(storedMessages);
eventEmitter.on('chatMessage', message => {
  const incomingChannel = message.channel;
  const currentMessages = storedMessages[incomingChannel];
  if (currentMessages) {
    currentMessages.push(message.msg);
    if (currentMessages.length > 10) {
      const arrayToText = { text: "'" + currentMessages.join('') + "'" };
      currentMessages.splice(0, currentMessages.length);
      watson.runAnalysis(arrayToText)
      .then((data) => {
        const newToneSet = {
          channel: incomingChannel,
          toneData: data.toneData,
        };
        toneController.saveTone(newToneSet);
        // store that shit
        // console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    }
    console.log(storedMessages);
  }
});
