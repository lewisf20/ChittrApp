//chit management
export const GET_CHITS = 'GET_CHITS';
export const POST_CHIT = 'POST_CHIT';

/* 
This contains the actions needed for chit management
*/

/**
 *
 * @param {String: Authorization token} token
 * getChits retrieves all the chits from the server based on if
 * the user is logged in or not. If the user is logged in, a token is
 * used in the request, if token is null that means the user has not been
 * authenticated and a token will not be used and that gets every chit.
 */
export const getChits = token => {
  return async dispatch => {
    let headers = {};
    if (token !== null) {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('getchits Response = ' + responseJsonData);
    dispatch({
      type: GET_CHITS,
      chitList: responseData,
      token: token,
    });
  };
};

/**
 *
 * @param {String: Authorization token} token
 * @param {the string container the chit to be sent to the server} chit
 * PostChit sends a chit to the server as long as the authorization token
 * is valid. If the token is not valid, there will be an auth error.
 */
export const postChit = (token, chit) => {
  return async dispatch => {
    let currentDate = Date.now();
    const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({
        timestamp: currentDate,
        chit_content: chit,
        //add location here
      }),
    });
    if (!response.ok) {
      throw new Error('response error!');
    }
    const responseData = await response.json();
    const responseJsonData = JSON.stringify(responseData);
    console.log('post chit Response = ' + responseJsonData);
    dispatch({
      type: POST_CHIT,
      token: action.token,
      chit: action.chit,
    });
  };
};
