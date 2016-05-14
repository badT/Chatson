const Tone = require('../schemas/toneSchema');

const toneDataDocumentID = {};

exports.saveTone = (tone) => {
  // format for saving tone data
  const formatTone = {
    channel: tone.channel,
    messageCount: 1,
    emos: {
      anger: tone.toneData.emotion.anger,
      disgust: tone.toneData.emotion.disgust,
      fear: tone.toneData.emotion.fear,
      joy: tone.toneData.emotion.joy,
      sadness: tone.toneData.emotion.sadness,
      agreeableness: tone.toneData.social.agreeableness_big5,
      conscientiousness: tone.toneData.social.conscientiousness_big5,
      extraversion: tone.toneData.social.extraversion_big5,
      neuroticism: tone.toneData.social.neuroticism_big5,
      openness: tone.toneData.social.openness_big5,
    },
  };

  if (!toneDataDocumentID[tone.channel]) {
    Tone.filter({ channel: formatTone.channel }).run().then((data) => {
      if (data.length === 0) {
        saveNewTone(formatTone);
      } else {
        toneDataDocumentID[formatTone.channel] = data[0].id;
        updateCurrentTone(formatTone);
      }
    });
  } else {
    updateCurrentTone(formatTone);
  }

};

function saveNewTone(toneData) {
  const newTone = new Tone(toneData);
  newTone.save().then((result) => {
    // console.log('Tone saved:', result);
    toneDataDocumentID[result.channel] = result.id;
    return result;
  }).error((err) => {
    console.log('toneController error:', err);
  });
}

function updateCurrentTone(toneData) {
  // console.log('inside updateCurrentTone', toneData);
  Tone.get(toneDataDocumentID[toneData.channel]).run().then((data) => {
    // console.log('inside udpate tone', data);
    const newTones = updateEmoStats(data, toneData);
    Tone.get(toneDataDocumentID[toneData.channel]).update(newTones).run().then((newdata) => {
    });
  });
}

function updateEmoStats(currentTones, newTones) {
  const newToneData = currentTones;
  const currentCount = newToneData.messageCount;
  const newCount = newToneData.messageCount + 1;
  const emoObject = newToneData.emos;
  for (var key in emoObject) {
    emoObject[key] = Math.round((((emoObject[key] * currentCount)
    + newTones.emos[key]) / newCount) * 100) / 100;
  }
  newToneData.messageCount = newCount;
  return newToneData;
}


exports.getToneData = () => {
  return new Promise((resolve, reject) => {
    Tone.run().then((data) => {
      resolve(data);
    });
  });
};
