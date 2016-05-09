import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import * as actions from '../../actions/index';
import nock from 'nock';
import expect from 'expect';
import axios from 'axios';

const middlewares = [thunk, ReduxPromise];
const mockStore = configureMockStore(middlewares);

describe('action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GET_CHANNELS action when getChannels is called', () => {
    nock()
      .get('https://api.twitch.tv/kraken/streams?api_version=3&limit=25')
      .reply(200, { body: { channels: ['blumpkinBros', 'blumpkinPals'] } });
      console.log('here');
    const expectedActions = [
      { type: actions.GET_CHANNELS, body: { channels: ['blumpkinBros', 'blumpkinPals'] } },
    ];
    const store = mockStore({ channels: [] });

    return store.dispatch(actions.getChannels())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//
//   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//     nock('http://example.com/')
//       .get('/todos')
//       .reply(200, { body: { todos: ['do something'] } });
//
//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } },
//     ];
//     const store = mockStore({ todos: [] });
//
//     return store.dispatch(actions.fetchTodos())
//       .then(() => { // return of async actions
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//   });
// });
