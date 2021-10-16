import { combineReducers } from 'redux';
import { successReducer } from './successReducer/successReducer';
import { guessedWordsReducer } from './guessedWordsReducer/guessedWordsReducer';
import { secretWordReducer } from './secretWordReducer/secretWordReducer';
import { giveUpReducer } from './giveUpReducer/giveUpReducer';
import { serverErrorReducer } from './serverErrorReducer/serverErrorReducer';

export const rootReducer = combineReducers({
  successReducer,
  guessedWordsReducer,
  secretWordReducer,
  giveUpReducer,
  serverErrorReducer
})