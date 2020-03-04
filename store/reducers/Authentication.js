import {LOGIN, SIGNUP, LOGOUT} from '../actions/Authentication';
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

// //stores the global state to use across the app
// const authorisationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TOKEN:
//       return {...state, token: state.token};
//     default:
//       return state;
//   }
// };

// export default authorisationReducer;
