import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthGuard from '../../hooks/useAuthGuard';

const ProtectedRoute = ({ children, expectedRole }) => {
  const { user, loading } = useAuthGuard();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" />;

  if (expectedRole && user.rol !== expectedRole) {
    return <Navigate to={`/${user.rol.toLowerCase()}Dashboard`} />;
  }

  return children;
};

export default ProtectedRoute;