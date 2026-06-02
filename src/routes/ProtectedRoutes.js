import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Requires any authenticated user
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// Requires ROLE_ADMIN - redirect non-admins to /unauthorized
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// Requires ROLE_USER (normal user) - redirect admins to their dashboard
// NOTE: both ROLE_USER and ROLE_ADMIN can actually browse movies;
// this restricts direct /home etc from admin (optional UX choice)
export const UserRoute = ({ children }) => {
  const { isAuthenticated, isUser, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Admins accidentally landing on user routes → send to admin dashboard
  if (isAdmin && !isUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};
