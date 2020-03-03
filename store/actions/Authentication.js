export const TOKEN = 'TOKEN';

export const setToken = token => {
  return {type: TOKEN, token: token};
};
