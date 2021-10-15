import axios from 'axios';
import { getLetterMatchCount } from '../helpers/helpers';


export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD'
};

export function correctGuess() {
  return {
    type: actionTypes.CORRECT_GUESS,
  };
}

export const guessWord = (guessedWord) => (dispatch, getState) => {
  const { secretWord } = getState().secretWordReducer;
  const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
  dispatch({ type: actionTypes.GUESS_WORD, payload: { guessedWord, letterMatchCount } });

  if (guessedWord === secretWord) {
    dispatch(correctGuess());
  }
};

export const getSecretWord = () => (dispatch) => {
  return axios.get('http://localhost:3030').then(res => {
    dispatch({type: actionTypes.SET_SECRET_WORD, secretWord: res.data})
  });
};