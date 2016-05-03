const twitchIO = require('socket.io');
const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const eventEmitter = require('./eventEmitter');
const Tone = require('../db/schemas/toneSchema');
const analyzer = require('../watson/analyzer');


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

exports.establishConnection = () => {
  let twitchClient = null;
  let channelList = [];

  return {
    connect: (channel) => {
      if (channelList.indexOf(channel) !== -1) return;
      channelList.push(channel);

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
