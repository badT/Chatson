import { GET_CHANNELS } from '../actions/items';

export default function (state = [], action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.payload.data.streams;

    default:
      return state;
  }
}
