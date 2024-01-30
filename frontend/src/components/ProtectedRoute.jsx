import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import backgroundImage from "../bg.jpg";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/verify",
    "/reset-password",
  ];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  let isAuthenticated;
  try {
    const decoded = jwtDecode(token);
    // console.log(decoded)
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

  return (
    <>
      {/* <img
        // src={backgroundImage}
        src={'https://media.istockphoto.com/id/1167374936/photo/abstract-of-yellow-arrow-graph-on-blue-background-corporate-future-growth-plan-business.jpg?s=612x612&w=0&k=20&c=ST1gtKmlhM7trSKMpcCovn9u06NGTtv8iEueGQFeNVQ='}
        style={{
          height: "100%",
          width: "100vw",
          position: "absolute",
          top: 0,
          zIndex: -100,
          opacity: 0.3,
        }}
        alt="background image"
      /> */}
    <img 
    src="https://media.istockphoto.com/id/1167374936/photo/abstract-of-yellow-arrow-graph-on-blue-background-corporate-future-growth-plan-business.jpg?s=612x612&w=0&k=20&c=ST1gtKmlhM7trSKMpcCovn9u06NGTtv8iEueGQFeNVQ=" 
    alt="Description of image" 
    style={{
      opacity: 0.3, 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: -1
    }} 
/>



      {children}
    </>
  );
}

export default ProtectedRoute;
