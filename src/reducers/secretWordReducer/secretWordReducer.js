import { actionTypes } from '../../actions';

const initialState = {
  secretWord: '',
};

/**
 *
 * @param {object} state - Array of guessed words.
 * @param {object} action - actions to be reducer
 * @returns {object} - new state
 */
export const secretWordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD: {
      return {
        ...state,
        secretWord: action.secretWord,
      };
    }
    case actionTypes.SET_CUSTOM_SECRET_WORD: {
      return {
        ...state,
        secretWord: action.payload,
      };
    }
    default:
      return state;
  }
};