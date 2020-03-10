import {GET_CHITS, POST_CHIT} from '../actions/ChitManagement';

/*
This contains the reducers needed for chit management
*/

const initialState = {
  chitList: [],
  chit: null,
  token: null,
  userId: null,
  start: 0,
  count: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHITS:
      return {
        token: action.token,
        chitList: action.chitList,
      };
    case POST_CHIT:
      return {
        token: action.token,
        chit: action.chit,
      };
    default:
      return state;
  }
};
