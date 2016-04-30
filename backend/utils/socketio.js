const twitchIO = require('socket.io');
const twitchClient = require('./tmiClient');
const Rx = require('rx');
const eventEmitter = require('./eventEmitter');
const messageController = require('../db/messageController');

const messageSource = Rx.Observable.fromEvent(twitchClient, 'chat', (channel, user, msg) => {
  return { channel, user, msg };
});

const messageSubscription = messageSource.subscribe((msgObj) => {
  eventEmitter.emit('chatMessage', msgObj);
  messageController.saveMessage(msgObj);
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
