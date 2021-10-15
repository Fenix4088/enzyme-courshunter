import { actionTypes } from '../../actions';

const initialState = {
  guessedWords: [],
};

/**
 *
 * @param {object} state - Array of guessed words.
 * @param {object} action - actions to be reducer
 * @returns {object} - new state
 */
export const guessedWordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.GUESS_WORD): {
      return {
        ...state,
        guessedWords: [...state.guessedWords, action.payload],
      };
    }
    case (actionTypes.RESET_GUESSED_WORDS): {
      return {
        ...state,
        guessedWords: [],
      };
    }
    default:
      return state;
  }
};