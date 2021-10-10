import { combineReducers } from 'redux';
import { successReducer } from './successReducer/successReducer';

export const rootReducer = combineReducers({
  successReducer,
})