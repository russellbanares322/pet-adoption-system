import AuthLayout from "../components/auth-layout/AuthLayout";
import Home from "../pages/home/Home";
import Pets from "../pages/pets/Pets";

export const routes = [
  {
    path: "/",
    element: <Home />,
    isProtected: false,
  },
  {
    path: "/login",
    element: <AuthLayout />,
    isProtected: false,
  },
  {
    path: "/sign-up",
    element: <AuthLayout />,
    isProtected: false,
  },
  {
    path: "/forgot-password",
    element: <AuthLayout />,
    isProtected: false,
  },
  {
    path: "/pets",
    element: <Pets />,
    isProtected: false,
  },
];
