import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChannelReducer from './reducerGetChannels';
import MessageReducer from './reducerGetMessage';

const rootReducer = combineReducers({
  form: formReducer,
  channels: ChannelReducer,
  message: MessageReducer,
  /* your reducers */

});

export default rootReducer;
