const twitchIO = require('socket.io');
const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const eventEmitter = require('./eventEmitter');
const analyzer = require('../watson/analyzer');


// Listenes for a new chat message and moves the message into the analyzer file
eventEmitter.on('chatMessage', (msgObj) => {
  analyzer.intoTones(msgObj);
});

exports.establishConnection = () => {
  let twitchClient = null;
  let channelList = [];

  return {
    connect: (channel) => {
      if (channelList.indexOf(channel) !== -1) return;
      // channelList.push(channel);
      channelList[0] = channel;

      if (twitchClient) {
        twitchClient.disconnect().then(() => {
          console.log('Connecting to: ', channelList);
          twitchClient = new tmi.client(chooseChannel(channelList));
          twitchClient.connect();

          twitchClient.on('chat', (channel, user, msg) => {
            eventEmitter.emit('chatMessage', { channel, user, msg });
          });
        });
      } else {
        twitchClient = new tmi.client(chooseChannel(channelList));
        twitchClient.connect();

        twitchClient.on('chat', (channel, user, msg) => {
          eventEmitter.emit('chatMessage', { channel, user, msg });
        });
      }
    }
  }
}

exports.ioConnect = server => {
  const io = twitchIO.listen(server);

  io.sockets.on('connection', socket => {

    socket.on('channel:subscribe', channel => {
      console.log('subscribe to: ', channel);
      socket.join(channel);
    });

    socket.on('channel:unsubscribe', channel => {
      console.log('unsubscribe from: ', channel);
      socket.leave(channel);
    });

    eventEmitter.on('chatMessage', message => {
      let channel = message.channel.substr(1);
      io.to(channel).emit('message', message);
    });

  });

  return io;
};
