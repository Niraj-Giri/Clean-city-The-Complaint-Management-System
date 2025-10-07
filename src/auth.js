// src/auth.js
export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
};
