const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const client = new tmi.client(chooseChannel([
  'zfg1'
]));

client.connect();

module.exports = client;
