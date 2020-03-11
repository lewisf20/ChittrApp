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
      userId: userId,
      token: token,
      givenName: givenName,
      familyName: familyName,
      email: email,
      password: password,
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
          'X-Authorization': token,
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    dispatch({
      type: FOLLOW_USER,
      userId: userId,
      token: token,
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
          'X-Authorization': token,
        },
      },
    );
    if (!response.ok) {
      throw new Error('response error!');
    }
    dispatch({
      type: UNFOLLOW_USER,
      userId: userId,
      token: token,
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

export const getFollowers = userId => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}/followers`,
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
    console.log('Get followers Response = ' + responseJsonData);
    dispatch({
      type: GET_FOLLOWERS,
      followerList: responseData,
    });
  };
};

export const getFollowing = userId => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${userId}/following`,
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
    console.log('Get following Response = ' + responseJsonData);
    dispatch({
      type: GET_FOLLOWING,
      followingList: responseData,
    });
  };
};
