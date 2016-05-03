import { GET_CHANNELS, SET_CHANNEL } from '../actions/index';
const INITIAL_STATE = { list: [], selected: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { ...state, list: action.payload.data.streams };
    case SET_CHANNEL:
      return { ...state, selected: action.payload.data.channel };
    default:
      return state;
  }
};
