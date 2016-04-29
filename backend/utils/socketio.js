const twitchIO = require('socket.io');
const twitchClient = require('./tmiClient');
// const Rx = require('rx');
const eventEmitter = require('./eventEmitter');
const messageController = require('../db/messageController');

// const messageSource = Rx.Observable.fromEvent(twitchClient, 'chat', () => {
//   let args = [].slice.call(arguments);
//   return {
//     user: args[1].username,
//     message: args[2]
//   };
// });

// const messageSubscription = messageSource.subscribe(msgObj => {
//   eventEmitter.emit('chatMessage', msgObj);
// });

twitchClient.on('chat', (channel, user, msg, self) => {
  const messageBody = {
    channel,
    user,
    msg,
  };

  messageController.saveMessage(messageBody);

  eventEmitter.emit('chatMessage', {
    user: user.username,
    message: msg,
  });
});

module.exports = server => {
  const io = twitchIO.listen(server);

  io.sockets.on('connection', socket => {
    socket.send('hello world');

    eventEmitter.on('chatMessage', message => {
      socket.send(message);
    });
  });

  return io;
};
