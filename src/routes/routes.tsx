import ErrorPage from "../pages/error-page/ErrorPage";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import AboutUs from "../pages/about-us/AboutUs";
import MyAdoptions from "../pages/adoptions/MyAdoptions";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import PetAdoption from "../pages/dashboard/adoption/PetAdoption";
import ListedPets from "../pages/dashboard/listed-pets/ListedPets";
import PendingPosts from "../pages/dashboard/pending-posts/PendingPosts";
import Profile from "../pages/dashboard/profile/Profile";
import RegisteredUsers from "../pages/dashboard/registered-users/RegisteredUsers";
import UserSuggestions from "../pages/dashboard/suggestions/UserSuggestions";
import SavedFavoritePosts from "../pages/favorites/SavedFavoritePosts";
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
    path: "/my-adoptions",
    element: <MyAdoptions />,
    isProtected: true,
    child: [],
  },
  {
    path: "/favorites",
    element: <SavedFavoritePosts />,
    isProtected: true,
    child: [],
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    isProtected: true,
    child: [
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
        path: "registered-users",
        element: <RegisteredUsers />,
        child: [],
        isProtected: true,
      },
      {
        path: "pet-adoptions",
        element: <PetAdoption />,
        child: [],
        isProtected: true,
      },
      {
        path: "user-suggestions",
        element: <UserSuggestions />,
        child: [],
        isProtected: true,
      },
      {
        path: "profile",
        element: <Profile />,
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
