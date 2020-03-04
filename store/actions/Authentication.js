export const TOKEN = 'TOKEN';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const setToken = token => {
  return {type: TOKEN, token: token};
};

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
      throw new Error('error');
    }

    const responseData = await response.json();

    const responseJsonData = JSON.stringify(responseData);
    console.log('Signup Response = ' + responseJsonData);
    dispatch({type: SIGNUP});
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
      throw new Error('error');
    }

    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('Login Response = ' + responseJsonData);
    dispatch({type: LOGIN});
  };
};
