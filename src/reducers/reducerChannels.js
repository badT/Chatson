import { GET_CHANNELS } from '../actions/items';
const INITIAL_STATE = { list: [], selected: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { ...state, list: action.payload.data.streams };
    case SET_CHANNEL:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};
