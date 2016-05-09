import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import * as actions from '../../actions/index';
import nock from 'nock';
import expect from 'expect';
// import axios from 'axios';

const middlewares = [thunk, ReduxPromise];
const mockStore = configureMockStore(middlewares);

describe('action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GET_CHANNELS action when getChannels is called', () => {

    const store = mockStore({
      channels: {
        list: [],
        selected: null,
      },
      tone: {},
    });

    return store.dispatch(actions.getChannels())
      .then(() => { // return of async actions
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_CHANNELS);
      });
  });

  it('creates SET_CHANNEL action when setChannel is called', () => {

    const store = mockStore({
      channels: {
        list: [],
        selected: null,
      },
      tone: {},
    });

    return store.dispatch(actions.setChannel('someChannel'))
      .then(() => { // return of async actions
        const createdActions = store.getActions();
        console.log(store.getState().channels.selected);
        expect(createdActions[0].type).toEqual(actions.SET_CHANNEL);
      });
  });

  it('creates GET_TONE action when getTone is called', () => {

    const store = mockStore({
      channels: {
        list: [],
        selected: null,
      },
      tone: {},
    });

    return store.dispatch(actions.getTone())
      .then(() => { // return of async actions
        const createdActions = store.getActions();
        expect(createdActions[0].type).toEqual(actions.GET_TONE);
      });
  });
});
