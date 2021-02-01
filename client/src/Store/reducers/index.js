import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import advertReducer from './advert.reducer';

const rootReducer = combineReducers({
  authReducer,
  advertReducer,
});

export default rootReducer;
