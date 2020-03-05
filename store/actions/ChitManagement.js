//chit management
export const GET_CHITS = 'GET_CHITS';
export const POST_CHIT = 'POST_CHIT';

/* 
This contains the actions needed for chit management
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
      chitList: responseData.reverse(),
      token: token,
    });
  };
};

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
    });
  };
};
