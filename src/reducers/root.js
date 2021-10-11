import { combineReducers } from 'redux';
import { successReducer } from './successReducer/successReducer';
import { guessedWordsReducer } from './guessedWordsReducer/guessedWordsReducer';

export const rootReducer = combineReducers({
  successReducer,
  guessedWordsReducer
})