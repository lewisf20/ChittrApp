export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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
