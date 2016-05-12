import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import expect from 'expect';

import * as actions from '../../actions/index';

const middlewares = [thunk, ReduxPromise];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  channels: {
    list: [],
    selected: null,
  },
  tone: {},
});

describe('action creators', () => {

  afterEach(() => {
    store.clearActions();
  });

  it('creates GET_CHANNELS action when getChannels is called', () => {
    return store.dispatch(actions.getChannels())
      .then(() => {
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_CHANNELS);
      });
  });

  it('creates SET_CHANNEL action when setChannel is called', () => {
    return store.dispatch(actions.setChannel('someChannel'))
      .then(() => {
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.SET_CHANNEL);
      });
  });

  it('creates GET_TONE action when getTone is called', () => {
    return store.dispatch(actions.getTone())
      .then(() => {
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_TONE);
      });
  });
});
