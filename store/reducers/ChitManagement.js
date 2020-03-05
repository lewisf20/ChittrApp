import {GET_CHITS, POST_CHIT} from '../actions/ChitManagement';

/*
This contains the reducers needed for chit management
*/

const initialState = {
  chitList: [],
  chit: null,
  token: null,
  userId: null,
};
