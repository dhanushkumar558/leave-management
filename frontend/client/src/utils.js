export const API = 'https://leave.boltxgaming.com/api';

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
