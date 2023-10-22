import AuthLayout from "../components/auth-layout/AuthLayout";
import ErrorPage from "../components/error-page/ErrorPage";
import AboutUs from "../pages/about-us/AboutUs";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ListedPets from "../pages/dashboard/listed-pets/ListedPets";
import PendingPosts from "../pages/dashboard/pending-posts/PendingPosts";
import Profile from "../pages/dashboard/profile/Profile";
import Settings from "../pages/dashboard/settings/Settings";
import Home from "../pages/home/Home";
import Pets from "../pages/pets/Pets";
import MyPost from "../pages/post/MyPost";

export const routes = [
  {
    path: "/",
    element: <Home />,
    isProtected: false,
    child: [],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    isProtected: false,
    child: [],
  },
  {
    path: "/sign-up",
    element: <AuthLayout />,
    isProtected: false,
    child: [],
  },
  {
    path: "/forgot-password",
    element: <AuthLayout />,
    isProtected: false,
    child: [],
  },
  {
    path: "/pets",
    element: <Pets />,
    isProtected: false,
    child: [],
  },
  {
    path: "/my-post",
    element: <MyPost />,
    isProtected: true,
    child: [],
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    isProtected: true,
    child: [
      {
        path: "profile",
        element: <Profile />,
        child: [],
        isProtected: true,
      },
      {
        path: "listed-pets",
        element: <ListedPets />,
        child: [],
        isProtected: true,
      },
      {
        path: "pending-posts",
        element: <PendingPosts />,
        child: [],
        isProtected: true,
      },
      {
        path: "settings",
        element: <Settings />,
        child: [],
        isProtected: true,
      },
    ],
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    isProtected: false,
    child: [],
  },
  {
    path: "*",
    element: <ErrorPage />,
    isProtected: false,
    child: [],
  },
];
