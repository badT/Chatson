'use strict';
const path = require('path');
const toneAnalyzer = require(path.resolve(__dirname, '../', '../watson/analyzer.js'));
const Message = require('../schemas/messageSchema');

exports.saveMessage = (message) => {
  const newMessage = new Message(message);
  newMessage.save().then((result) => {
    // console.log(result);
  }).error((err) => {
    console.log('messageController error:', err);
  });
};

let mess = {};

exports.getMessages = (callback) => {
  // Message.pluck({ user: 'user-id' }).execute().then((posts) => {
  Message.pluck('msg').limit(100).execute().then((posts) => {
    const holderArray = [];
    for (const value of posts) {
      holderArray.push(value.msg);
    }
    // console.log(holderArray.join(''));
    mess = { text: "'" + holderArray.join('') + "'" };
    toneAnalyzer.getTone(mess);
    callback(holderArray.join('. '));
  });
};
