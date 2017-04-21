export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (err) {
    return undefined;
  }
}

export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (err){
    return undefined;
  }
  return true;
}

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (err) {
    return undefined;
  }
  return true;
}