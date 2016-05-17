import expect from 'expect';

import * as actions from '../../actions/index';
import reducerTone from '../../reducers/reducerTone';
import reducerChannels from '../../reducers/reducerChannels';
import reducerLongTermTone from '../../reducers/reducerLongTermTone';


const initialToneState = { tone: null };

const dummyWatsonData = {
  type: actions.GET_TONE,
  payload: {
    data: {
      toneData: {
        emotion:
        { id: 'emotion_tone',
        anger: 14.34,
        disgust: 40.61,
        fear: 11.65,
        joy: 0.32,
        sadness: 5.72 },
        writing:
        { id: 'writing_tone',
        analytical: 91,
        confident: 76.8,
        tentative: 92.8 },
        social:
        { id: 'social_tone',
        openness_big5: 27.7,
        conscientiousness_big5: 4.1,
        extraversion_big5: 31.1,
        agreeableness_big5: 24.2,
        neuroticism_big5: 93.4 },
      },
    },
  },
};

describe('Tone reducer:', () => {
  it('should return the initial state', () => {
    expect(
      reducerTone(initialToneState, {})
    ).toEqual(initialToneState);
  });

  it('should NOT alter state if status of 200 is NOT received', () => {
    dummyWatsonData.payload.status = 500;
    expect(
      reducerTone(initialToneState, dummyWatsonData)
    ).toEqual(initialToneState);
  });

  it('should set tone to received values if status of 200 is received', () => {
    dummyWatsonData.payload.status = 200;
    const toneResult = { tone: dummyWatsonData.payload.data.toneData };
    expect(
      reducerTone(initialToneState, dummyWatsonData)
    ).toEqual(toneResult);
  });
});

// variables for testing Channels reducer

const initialChannelState = {
  list: [],
  selected: null,
};

const dummySetChannelInput = {
  type: actions.SET_CHANNEL,
  payload: {
    data: {
      channel: 'blumpyPals',
    },
  },
};

const dummySetChannelOutput = {
  list: [],
  selected: dummySetChannelInput.payload.data.channel,
};

const dummyGetChannelsInput = {
  type: actions.GET_CHANNELS,
  payload: {
    data: {
      streams: [
        {
          viewers: 100,
          game: 'tetris',
          name: 'blumpyBros',
        },
        {
          viewers: 300,
          game: 'PacMan',
          name: 'blumpyPals',
        },
      ],
    },
  },
};

const dummyGetChannelsOutput = {
  list: dummyGetChannelsInput.payload.data.streams,
  selected: null,
};

describe('Channels reducer:', () => {
  it('should return the initial state', () => {
    expect(
      reducerChannels(initialChannelState, {})
    ).toEqual(initialChannelState);
  });

  it('should set selected channel', () => {
    expect(
      reducerChannels(initialChannelState, dummySetChannelInput)
    ).toEqual(dummySetChannelOutput);
  });

  it('should set channels list', () => {
    expect(
      reducerChannels(initialChannelState, dummyGetChannelsInput)
    ).toEqual(dummyGetChannelsOutput);
  });
});


// variables for testing LongTermToneReducer

const initialLongTermToneState = { longTermTone: null };

const dummyLongTermToneData = {
  type: actions.GET_LONGTERMTONE,
  payload: {
    data: [{
      channel: '#wyld',
      createdAt: '2016-05-17T20:16:27.288Z',
      emos: {
        agreeableness: 35.17,
        anger: 39.91,
        conscientiousness: 20.63,
        disgust: 5.23,
        extraversion: 48.9,
        fear: 1.45,
        joy: 0.02,
        neuroticism: 74.02,
        openness: 28,
        sadness: 0.93,
      },
      id: 'b6f48467-19bc-4179-8644-6218fe3f7feb',
      messageCount: 6,
    }],
  },
};

describe('longTermTone reducer:', () => {
  it('should return the initial state when passed an empty object', () => {
    expect(
      reducerLongTermTone(initialLongTermToneState, {})
    ).toEqual(initialLongTermToneState);
  });

  it('should set long term tone with new data', () => {
    const expectedLongTermTone = { longTermTone: dummyLongTermToneData.payload.data };
    expect(
      reducerLongTermTone(initialLongTermToneState, dummyLongTermToneData)
    ).toEqual(expectedLongTermTone);
  });
});
