import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  GET_USER,
  UPDATE_USER,
} from '../actions/Authentication';

/*
This contains the reducers needed for authentication of a user
*/

const initialState = {
  token: null,
  idUser: null,
  givenName: null,
  familyName: null,
  password: null,
  email: null,
  userData: {},
  recentChits: [],
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
    case GET_USER:
      return {
        ...state,
        givenName: action.givenName,
        familyName: action.familyName,
        email: action.email,
        userData: action.userData,
        recentChits: action.recentChits,
      };
    case UPDATE_USER:
      return {
        ...state,
        idUser: action.idUser,
        token: action.token,
        givenName: action.givenName,
        familyName: action.familyName,
        email: action.email,
        password: action.password,
      };

    default:
      return state;
  }
};
