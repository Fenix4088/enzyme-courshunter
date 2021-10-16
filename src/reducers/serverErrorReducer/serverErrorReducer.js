import { actionTypes } from '../../actions';

const initialState = {
  isServerError: false,
  message: ''
}


export const serverErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case(actionTypes.SET_SERVER_ERROR): {
      return {
        ...state,
        isServerError: action.payload.status,
        message: action.payload.message
      }
    }
    default:
      return state;
  }
}