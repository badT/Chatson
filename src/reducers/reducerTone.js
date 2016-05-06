import { GET_TONE } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case GET_TONE:
      return action.payload.data;

    default:
      return state;
  }
}
