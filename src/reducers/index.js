import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChannelReducer from './reducerChannels';
import MessageReducer from './reducerGetMessage';
import ToneReducer from './reducerTone';

const rootReducer = combineReducers({
  form: formReducer,
  channels: ChannelReducer,
  message: MessageReducer,
  tone: ToneReducer,
});

export default rootReducer;
