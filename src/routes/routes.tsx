import AuthLayout from "../components/auth-layout/AuthLayout";
import ErrorPage from "../components/error-page/ErrorPage";
import AboutUs from "../pages/about-us/AboutUs";
import Dashboard from "../pages/dashboard/Dashboard";
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
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    isProtected: false,
  },
  {
    path: "*",
    element: <ErrorPage />,
    isProtected: false,
  },
];
