import {LOGIN, SIGNUP, LOGOUT} from '../actions/Authentication';

/*
This contains the reducers needed for authentication of a user
*/

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return {
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
