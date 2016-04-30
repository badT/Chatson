const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const client = new tmi.client(chooseChannel([
  // 'wyld', 'ZenocideGenius'
]));

client.connect();

module.exports = client;
