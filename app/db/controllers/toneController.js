const Tone = require('../schemas/toneSchema');

exports.saveTone = (tone) => {
  const formatTone = {
    channel: tone.channel,
    messageCount: 0,
    // toneData: tone.toneData.,
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
  };
  const newTone = new Tone(formatTone);
  newTone.save().then((result) => {
    // console.log('Tone saved:', result);
    console.log(result);
    return result;
  }).error((err) => {
    console.log('toneController error:', err);
  });
};


exports.getToneData = () => {
  return new Promise((resolve, reject) => {
    Tone.filter({ channel: '#bacon_donut' }).run().then((data) => {
      resolve(data);
      console.log('tonecontroller', data);
    });
  });
};

Tone.pre('save', (next) {

});
