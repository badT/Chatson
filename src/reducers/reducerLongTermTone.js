import { GET_LONGTERMTONE } from '../actions/index';
const INITIAL_STATE = { longTermTone: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LONGTERMTONE:
      return { ...state, longTermTone: action.payload.data };

    default:
      return state;
  }
}
