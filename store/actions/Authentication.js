export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

/*
This contains all actions needed for authentication of a user
*/

export const signup = (email, password, givenName, familyName) => {
  return async dispatch => {
    const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        given_name: givenName,
        family_name: familyName,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email/email exists');
    }

    const responseData = await response.json();

    const responseJsonData = JSON.stringify(responseData);
    console.log('Signup Response = ' + responseJsonData);
    dispatch({
      type: SIGNUP,
      token: responseData.token,
      idUser: responseData.id,
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('Login Response = ' + responseJsonData);
    dispatch({type: LOGIN, token: responseData.token, idUser: responseData.id});
  };
};

export const logout = token => {
  return async dispatch => {
    const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    });

    if (!response.ok) {
      throw new Error('Error');
    }

    console.log('inside logout');
    dispatch({type: LOGOUT, token: null, idUser: null});
  };
};

export const getUser = idUser => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseData = await response.json();
    console.log(responseData);
    dispatch({
      type: GET_USER,
      givenName: responseData.given_name,
      familyName: responseData.family_name,
      email: responseData.email,
      userData: responseData,
      recentChits: responseData.recent_chits,
    });
  };
};

export const updateUser = (
  idUser,
  token,
  email,
  password,
  givenName,
  familyName,
) => {
  return async dispatch => {
    const response = await fetch(
      `http://10.0.2.2:3333/api/v0.0.5/user/${idUser}`,
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
      idUser: action.idUser,
      token: action.token,
      givenName: action.givenName,
      familyName: action.familyName,
      email: action.email,
      password: action.password,
    });
  };
};
