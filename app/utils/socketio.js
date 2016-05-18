const twitchIO = require('socket.io');
const eventEmitter = require('./eventEmitter');
const long = require('./longTermChannels')

exports.ioConnect = server => {
  const io = twitchIO.listen(server);

  io.sockets.on('connection', socket => {

    socket.on('channel:subscribe', channel => {
      socket.join(channel);
    });

    socket.on('channel:unsubscribe', channel => {
      socket.leave(channel);
    });

    eventEmitter.on('chatMessage', message => {
      const channel = message.channel.substr(1);
      io.to(channel).emit('message', message);
    });

  });

  return io;
};
