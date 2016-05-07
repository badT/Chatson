import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChannelReducer from './reducerChannels';
import ToneReducer from './reducerTone';

const rootReducer = combineReducers({
  form: formReducer,
  channels: ChannelReducer,
  tone: ToneReducer,
});

export default rootReducer;
