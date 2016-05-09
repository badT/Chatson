import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import expect from 'expect';

import * as actions from '../../actions/index';
import reducerTone from '../../reducers/reducerTone';
import reducerChannels from '../../reducers/reducerChannels';

const middlewares = [thunk, ReduxPromise];
const mockStore = configureMockStore(middlewares);

const initialToneState = {};

const dummyWatsonData = {
  type: actions.GET_TONE,
  payload: {
    data: { emotion:
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
    expect(
      reducerTone(initialToneState, dummyWatsonData)
    ).toEqual(dummyWatsonData.payload.data);
  });

});

const initialChannelState = {
  list: [],
  selected: null,
};

const dummyChannelsData = {
  type: actions.GET_CHANNELS,
  payload: {
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
};

describe('Channels reducer:', () => {
  it('should return the initial state', () => {
    expect(
      reducerTone(initialChannelState, {})
    ).toEqual(initialChannelState);
  });

  it('should set selected channel', () => {
    dummyWatsonData.payload.status = 500;
    expect(
      reducerTone(initialChannelState, dummyWatsonData)
    ).toEqual(initialChannelState);
  });

  it('should set channels list', () => {
    dummyWatsonData.payload.status = 200;
    expect(
      reducerTone(initialChannelState, dummyWatsonData)
    ).toEqual(dummyWatsonData.payload.data);
  });

});
