import { actionTypes } from '../../actions';

const initialState = {
  giveUp: false,
}

export const giveUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_GIVE_UP_STATUS: {
        return {
          ...state,
          giveUp: action.payload
        }
      }
      default:
        return state
    }
}