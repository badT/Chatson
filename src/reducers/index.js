import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChannelReducer from './reducerChannels';
import ToneReducer from './reducerTone';
import LongTermToneReducer from './reducerLongTermTone';

const rootReducer = combineReducers({
  form: formReducer,
  channels: ChannelReducer,
  tone: ToneReducer,
  longTermTone: LongTermToneReducer,
});

export default rootReducer;
