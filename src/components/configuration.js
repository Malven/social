import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useAppDispatch } from '../contexts/useAppDispatch';

export const Configuration = ({ children }) => {
  const { logout, getUser } = useAppDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem('social-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        window.location.href = `/login`;
      } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        getUser();
      }
    }
  }, [getUser, logout]);

  return children;
};
