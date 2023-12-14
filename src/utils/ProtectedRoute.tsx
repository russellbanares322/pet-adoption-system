import React from "react";
import { Navigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useUserInfo();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
