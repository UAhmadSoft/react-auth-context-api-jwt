import React, {
  useContext,
  useState,
  useEffect,
  createContext,
} from 'react';

import axios from 'axios';
import { makeReq, handleCatch } from './makeReq';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenLocal = window.localStorage.getItem('token');

  const [token, setToken] = useState(tokenLocal);
  const [user, setUser] = useState();

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const resData = await makeReq('/users/me');
      console.log(`resData`, resData);

      setUser(resData.user);
    } catch (err) {
      handleCatch(err);
    }
  };

  const loginUser = (tk, uk) => {
    window.localStorage.setItem('token', tk);

    setTimeout(() => {
      setToken(tk);
      setUser(uk);
    }, 1000);
  };

  const logout = () => {
    window.localStorage.removeItem('token');

    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ token, user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
