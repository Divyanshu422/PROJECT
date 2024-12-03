import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext";

const UserProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Return the protected children (content)
  return children;
};

export default UserProtectedRoutes;
