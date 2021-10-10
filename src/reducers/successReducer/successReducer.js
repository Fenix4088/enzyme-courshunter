

import { actionTypes } from '../../actions';

const initialState = {
  success: false
}

/**
 *
 * @param {object} state - Array of guessed words.
 * @param {object} action - actions to be reducer
 * @returns {object} - new state
 */
export const successReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.CORRECT_GUESS):
      return {...state, success: true};
    default:
      return state;
  }
};