import React from "react";
import Login from "./Auth/Login";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedin = localStorage.getItem("token");
  const location = useLocation();
  const publicRoutes = ["/login", "/signup"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isLoggedin && isPublicRoute) {
    return <Navigate to="/" />;
  }

  if (!isLoggedin && !isPublicRoute) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
