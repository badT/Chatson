const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const client = new tmi.client(chooseChannel([
  'silphitv',
]));

client.connect();

module.exports = client;
