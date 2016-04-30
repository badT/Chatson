import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ChannelReducer from './reducerGetChannels';

const rootReducer = combineReducers({
  form: formReducer,
  channels: ChannelReducer,
  /* your reducers */

});

export default rootReducer;
