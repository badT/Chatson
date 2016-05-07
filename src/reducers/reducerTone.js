import { GET_TONE } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case GET_TONE:
      if (action.payload.status === 200) {
        return action.payload.data;
      }
      return state;
    default:
      return state;
  }
}
