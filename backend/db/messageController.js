'use strict';
const watson = require('watson-developer-cloud');
const Message = require('./messageSchema');

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
  Message.pluck('msg').limit(10).execute().then((posts) => {
    const holderArray = [];
    for (const value of posts) {
      holderArray.push(value.msg);
    }
    // console.log(holderArray.join(''));
    mess = { text: "'" + holderArray.join('.') + "'" };
    getTone(mess);
    callback(holderArray.join('. '));
  });
};


const tone_analyzer = watson.tone_analyzer({
  username: '26e60099-aeaa-4fe7-ae9d-95f029cd114c',
  password: 'qL27aW3ZG5Wn',
  version: 'v3-beta',
  version_date: '2016-02-11',
  sentences: 'false',
});



function getTone(message) {
  tone_analyzer.tone(message, (err, tone) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(JSON.stringify(tone, null, 2));
      console.log('should be going into toneCallback')
      toneCallback(tone);
    }
  });
}


/**
 * Converts a tone category into a flat object with tone values
 * @param {Object} tone category returned from API
 */
function getToneValues(toneCategory) {
  var tone = {
    id: toneCategory.category_id,
  };
  toneCategory.tones.forEach((toneValue) => {
    tone[toneValue.tone_id] = +((toneValue.score * 100).toFixed(2));
  });

  return tone;
}

/**
 * Converts a set of tones into flat objects
 * Assumes tone ids will be structured like 'category_id'
 * @param {Object} tone level returned from API
 */
function getTones(tone) {
  var tones = {};
  tone.tone_categories.forEach((category) => {
    tones[category.category_id.split('_')[0]] = getToneValues(category);
  });
  return tones;
}

/**
 * Success callback for tone alaysis POST request
 * @param {Object} response data from api
 */
function toneCallback(data) {
  var tone = {
    document: {},
    sentence: {},
  };

  // Results for the updated full transcript's tone
  tone.document = getTones(data.document_tone);

  // Results for the latest sentence's tone
  if (data.sentences_tone && data.sentences_tone[data.sentences_tone.length - 1].tone_categories.length)
      tone.sentence = getTones(data.sentences_tone[data.sentences_tone.length - 1]);

  console.log(tone);
}

/**
 * Error callback for tone alaysis POST request
 * @param {Object} error
 */
function err(error) {
  console.error(error);
  var message = typeof error.responseJSON.error === 'string' ?
    error.responseJSON.error :
    'Error code ' + error.responseJSON.error.code + ': ' + error.responseJSON.error.message;
  console.error(message);
}
