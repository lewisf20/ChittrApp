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
  userData: {},
};
