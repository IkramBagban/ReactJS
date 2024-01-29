import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const publicRoutes = ["/login", "/signup", "/forgot-password","/verify", "/reset-password"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  let isAuthenticated;
  try {
    const decoded = jwtDecode(token);
    console.log(decoded)
    isAuthenticated = decoded.userId === userId;
  } catch (err) {
    console.log("err", err);
    isAuthenticated = false;
  }

  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
