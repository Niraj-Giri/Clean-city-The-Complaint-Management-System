// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; // wrap in fragment to avoid syntax errors
};

export default ProtectedRoute;
