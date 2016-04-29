const twitchIO = require('socket.io');

module.exports = server => {
  const io = twitchIO.listen(server);

  io.sockets.on('connection', socket => {
    socket.send('hello world');
  });

  return io;
};
