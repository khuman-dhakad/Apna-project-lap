import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // FIX: Destructure 'user' state correctly from AuthContext
  const { user } = useAuth();

  // Agar user login nahi hai, to automatically home page pe redirect karo
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;