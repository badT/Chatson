const username = process.env.TWITCH_UN || require('../.appkeys.json')['twitch']['username'];
const pw = process.env.TWITCH_PW || require('../.appkeys.json')['twitch']['password'];

module.exports = channels => {
  return {
    options: {
      debug: false
    },
    connection: {
      cluster: 'aws',
      reconnect: true
    },
    identity: {
      username: username,
      password: pw
    },
    channels: channels
  }
};
