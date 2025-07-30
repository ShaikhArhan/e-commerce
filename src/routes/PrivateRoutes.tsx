import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  // TODO: Replace this with actual authentication check
  const isAuthenticated = true; // This should come from your auth state/context

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
