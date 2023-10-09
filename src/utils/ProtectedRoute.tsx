import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user-info") || "{}");

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRoute;
