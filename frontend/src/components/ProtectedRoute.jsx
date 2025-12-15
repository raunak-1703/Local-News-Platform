import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'sonner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly  && user.role!=='admin') {
    toast.error('Access denied. Admin only.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
