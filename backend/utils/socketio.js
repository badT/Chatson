const twitchIO = require('socket.io');
const twitchClient = require('./tmiClient');
const Rx = require('rx');
const eventEmitter = require('./eventEmitter');
// const messageController = require('../db/controllers/messageController');
const Tone = require('../db/schemas/toneSchema');
const analyzer = require('../watson/analyzer');


const messageSource = Rx.Observable.fromEvent(twitchClient, 'chat', (channel, user, msg) => {
  return { channel, user, msg };
});

const messageSubscription = messageSource.subscribe((msgObj) => {
  eventEmitter.emit('chatMessage', msgObj);
});

// Listenes for a new chat message and moves the message into the analyzer file
eventEmitter.on('chatMessage', (msgObj) => {
  analyzer.intoTones(msgObj);
});

// Listens for chanes to Tone table and console logs it
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

module.exports = server => {
  const io = twitchIO.listen(server);

  io.sockets.on('connection', socket => {

    eventEmitter.on('chatMessage', message => {
      io.emit('message', message);
    });

  });

  return io;
};
