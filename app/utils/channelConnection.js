const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');
const eventEmitter = require('./eventEmitter');

exports.establishConnection = () => {
  const channelList = ['#bacon_donut', '#wyld', '#ZiggyDLive', '#reynad'];
  const twitchClient = new tmi.client(chooseChannel(channelList));

  twitchClient.connect();

  twitchClient.on('chat', (channel, user, msg) => {
    eventEmitter.emit('chatMessage', { channel, user, msg });
  });

  return {
    connect: (channel) => {
      if (channelList.indexOf(`#${channel}`) !== -1) return;
      channelList.push(`#${channel}`);
      twitchClient.join(`#${channel}`).then((data) => {
        console.log('joining channel: ', data);
      }).catch((err) => {
        console.log('Join error: ', err);
      });
    },
  };
};
