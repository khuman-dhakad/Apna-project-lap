import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Agar user login nahi hai, to redirect karo home ya login page pe
  return currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
