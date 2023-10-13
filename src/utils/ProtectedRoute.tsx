import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user] = useAuthState(auth);
  const isLoggedIn = user;

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRoute;
