import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  children: React.ReactElement;
};

const ProtectedRoute = ({ isLoggedIn, children }: ProtectedRouteProps) => {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRoute;
