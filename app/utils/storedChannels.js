const toneController = require('../db/controllers/toneController');
const watson = require('../watson/analyzer')

const storedMessages = [];
let channel = '';

// Takes in the chat message, puts it into the storedMessages array
exports.intoTones = (message) => {
  channel = message.channel;
  storedMessages.push(message.msg);
};

// Timer for pushing messages to watson for analysis
setInterval(() => {
  if (storedMessages.length) {
    const arrayToText = { text: "'" + storedMessages.join('') + "'" };
    watson.runAnalysis(arrayToText).then((tone) => {
      console.log('Inside storeChannels', tone);
      toneController.saveTone(tone);
    }).catch((err) => {
      console.log(err);
    })
    storedMessages.splice(0, storedMessages.length);
  }
}, 3000);
