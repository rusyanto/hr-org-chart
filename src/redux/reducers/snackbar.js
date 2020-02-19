import {
  OPEN_SNACKBAR_ERROR, CLOSE_SNACKBAR_ERROR
} from '../actionTypes';

const initialState = {
  sbOpenError: false,
  sbMsgError: 'This is an error message!'
};

export default function snackbar (state = initialState, action) {
  switch (action.type) {
    
    case OPEN_SNACKBAR_ERROR: {
      const { msg } = action.payload;
      return {
        ...state,
        sbOpenError: true,
        sbMsgError: msg
      }
    }

    case CLOSE_SNACKBAR_ERROR: {
      return {
        ...state,
        sbOpenError: false
      }
    }
    
    default:
      return state;
  }
}
