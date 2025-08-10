import React from 'react';
import { Navigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from './authentication';

export default function ProtectRouter({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
