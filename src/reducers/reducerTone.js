import { GET_TONE, UNSET_TONE } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case GET_TONE:
      if (action.payload.status === 200) {
        return { ...state, tone: action.payload.data.toneData };
      }
      return state;
    case UNSET_TONE:
      return { ...state, tone: action.payload };
    default:
      return state;
  }
}
