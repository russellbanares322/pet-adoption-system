import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLinkRouteOptions } from "../components/navbar/types";

const navItemRoutes: {name: string, path:string}[] = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Blogs",
    path: "/blogs"
  },
  {
    name: "Login",
    path: "/login"
  },
  {
    name: "Signup",
    path: "/sign-up"
  },
  {
    name: "Pets",
    path: "/pets"
  },
  {
    name: "Dasboard",
    path: "/dashboard"
  },
  {
    name: "About",
    path: "/about-us"
  },
  {
    name: "MyPost",
    path: "/my-post"
  },
  {
    name: "MyAdoptions",
    path: "/my-adoptions"
  },
  {
    name: "Favorites",
    path: "/favorites"
  },
]
const useActiveNavLink = () => {
    const location = useLocation();
    const currentLocationPath = location.pathname
    const [activeNavLink, setActiveNavLink] = useState<NavLinkRouteOptions>("");

    const handleSetActiveNavLink = () => {
    const activeRouteName  = navItemRoutes.find((route) => (route.name === "Dashboard" || route.name === "Blogs") ? currentLocationPath.includes(route.path) : currentLocationPath === route.path)?.name;
    setActiveNavLink(activeRouteName as NavLinkRouteOptions)
    }

    useEffect(() => {
      handleSetActiveNavLink()
      }, [currentLocationPath]);

      const checkIfNavLinkActive = (pageName: NavLinkRouteOptions) => {
          const isPageCurrentlyVisited = activeNavLink === pageName;

          if(!isPageCurrentlyVisited){
            return false
          }
          return true
      }
  return { checkIfNavLinkActive }
}

export default useActiveNavLink