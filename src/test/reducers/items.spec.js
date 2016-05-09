// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import ReduxPromise from 'redux-promise';
// import * as actions from '../../actions/counter';
// import * as types from '../../constants/ActionTypes';
// import nock from 'nock';
// import expect from 'expect';
//
// const middlewares = [thunk, ReduxPromise];
// const mockStore = configureMockStore(middlewares);
//
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
//
// const initialState = {
//   items: [],
// };
//
// describe('Items reducer:', () => {
//   it('should return the initial state', () => {
//     expect(
//       items(initialState, {})
//     ).toEqual(initialState);
//   });
//
//   it('should handle ADD', () => {
//     const stateAfterAdd = {
//       items: [{
//         text: 'test'
//       }],
//     };
//     const fields =  { name: { value: 'test'}};
//     expect(
//       items(initialState, {
//         type: 'ADD_ITEM',
//         fields: fields,
//       })
//     ).toEqual(stateAfterAdd);
//   });
//
//   it('should handle DELETE', () => {
//     const stateWithItem = {
//       items: [{
//         text: 'test'
//       }],
//     };
//     expect(
//       items(stateWithItem, {
//         type: 'DELETE_ITEM',
//         index: 0
//       })
//     ).toEqual(initialState);
//   });
// });
