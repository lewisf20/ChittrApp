import {LOGIN, SIGNUP, LOGOUT} from '../actions/Authentication';

/*
This contains the reducers needed for authentication of a user
*/

const initialState = {
  token: null,
  idUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        idUser: action.idUser,
      };
    case SIGNUP:
      return {
        token: action.token,
        idUser: action.idUser,
      };
    case LOGOUT:
      return {
        token: action.token,
        idUser: action.idUser,
      };

    default:
      return state;
  }
};
