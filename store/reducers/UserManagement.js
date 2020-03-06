import {
  GET_USER,
  UPDATE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USER,
} from '../actions/UserManagement';

/*
This contains the reducers needed for user management
and follower management
*/

const initialState = {
  token: null,
  userId: null,
  followerList: [],
  followingList: [],
  givenName: null,
  familyName: null,
  password: null,
  email: null,
  userData: {},
  searchString: null,
  searchList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        userId: action.userId,
        userData: action.userData,
      };
    case UPDATE_USER:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        givenName: action.givenName,
        familyName: action.familyName,
        email: action.email,
        password: action.password,
      };
    case FOLLOW_USER:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        userId: action.userId,
        followerList: action.followerList,
      };
    case GET_FOLLOWING:
      return {
        ...state,
        userId: action.userId,
        followingList: action.followingList,
      };
    case SEARCH_USER:
      return {
        ...state,
        searchString: action.searchString,
        searchList: action.searchList,
      };
    default:
      return state;
  }
};
