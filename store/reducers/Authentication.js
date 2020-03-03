import {TOKEN} from '../actions/Authentication';
const initialState = {
  token: 'hi',
};

//stores the global state to use across the app
const authorisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {...state, token: state.token};
    default:
      return state;
  }
};

export default authorisationReducer;
