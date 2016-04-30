const tmi = require('tmi.js');
const chooseChannel = require('./tmiConfig');

const client = new tmi.client(chooseChannel([
  'laceduplauren'
]));

client.connect();

module.exports = client;