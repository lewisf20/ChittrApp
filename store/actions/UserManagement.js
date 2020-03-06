//user management
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

//follower management
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const GET_FOLLOWERS = 'GET_FOLLOWERS';
export const GET_FOLLOWING = 'GET_FOLLOWING';
export const SEARCH_USER = 'SEARCH_USER';

/*
This contains the actions needed for user management
and follower management
*/

export const getUser = userId => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('getuser Response = ' + responseJsonData);
    dispatch({
      type: GET_USER,
      userId: userId,
      userData: responseData,
    });
  };
};

export const updateUser = (
  userId,
  token,
  email,
  password,
  givenName,
  familyName,
) => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({
          given_name: givenName,
          family_name: familyName,
          email: email,
          password: password,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('update user Response = ' + responseJsonData);
    dispatch({
      type: UPDATE_USER,
      userId: action.userId,
      token: action.token,
      givenName: action.givenName,
      familyName: action.familyName,
      email: action.email,
      password: action.password,
    });
  };
};

export const followUser = (userId, token) => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}/follow`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('Follow a user Response = ' + responseJsonData);
    dispatch({
      type: FOLLOW_USER,
      userId: action.userId,
      token: action.token,
    });
  };
};

export const unfollowUser = (userId, token) => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}/follow`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('Unfollow a user Response = ' + responseJsonData);
    dispatch({
      type: FOLLOW_USER,
      userId: action.userId,
      token: action.token,
    });
  };
};

export const searchUser = searchString => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/search_user?q=${searchString}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('Search user Response = ' + responseJsonData);
    dispatch({
      type: SEARCH_USER,
      searchList: responseData,
    });
  };
};
