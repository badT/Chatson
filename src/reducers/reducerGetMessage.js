import { GET_MESSAGE } from '../actions/items';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_MESSAGE:
      return action.payload.data;

    default:
      return state;
  }
}
