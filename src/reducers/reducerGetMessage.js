import { GET_MESSAGE } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGE:
      return action.payload;

    default:
      return state;
  }
}
