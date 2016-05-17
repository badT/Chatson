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

  it('creates UNSET_CHANNEL action when unsetChannel is called', () => {
    const expectedAction = {
      type: actions.UNSET_CHANNEL,
      payload: null,
    };
    expect(actions.unsetChannel()).toEqual(expectedAction);
  });

  it('creates GET_TONE action when getTone is called', () => {
    return store.dispatch(actions.getTone())
      .then(() => {
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_TONE);
      });
  });

  it('creates UNSET_TONE action when unsetTone is called', () => {
    const expectedAction = {
      type: actions.UNSET_TONE,
      payload: null,
    };
    expect(actions.unsetTone()).toEqual(expectedAction);
  });

  it('creates GET_LONGTERMTONE action when getLongTermTone is called', () => {
    return store.dispatch(actions.getLongTermTone())
      .then(() => {
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_LONGTERMTONE);
      });
  });
});
