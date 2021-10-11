import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  logout();
  return <div></div>;
};

export default Logout;
