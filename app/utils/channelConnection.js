const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');
const eventEmitter = require('./eventEmitter');

exports.establishConnection = () => {
  let twitchClient = null;
  const channelList = [];

  return {
    connect: (channel) => {
      if (channelList.indexOf(`#${channel}`) !== -1) return;
      channelList.push(`#${channel}`);

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
    },
  };
};
