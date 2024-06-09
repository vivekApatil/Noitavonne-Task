import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  const login = (user) => {
    setAuth({
      isAuthenticated: true,
      user: user,
    });
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
