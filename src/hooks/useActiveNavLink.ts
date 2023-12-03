import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLinkRouteOptions } from "../components/navbar/types";

const useActiveNavLink = () => {
    const location = useLocation();
    const [activeNavLink, setActiveNavLink] = useState<NavLinkRouteOptions>("");
    const isInLoginRoute = location.pathname === "/login";
    const isInSignupRoute = location.pathname === "/sign-up";
    const isInPetsRoute = location.pathname === "/pets";
    const isInDashboardRoute = location.pathname.includes("/dashboard");
    const isInAboutRoute = location.pathname === "/about-us";
    const isInMyPostRoute = location.pathname === "/my-post";
    const isInMyAdoptionsRoute = location.pathname === "/my-adoptions";
    const isInFavoritesRoute = location.pathname === "/favorites";

    useEffect(() => {
        if (isInLoginRoute) {
          setActiveNavLink("Login");
        } else if (isInSignupRoute) {
          setActiveNavLink("Signup");
        } else if (isInPetsRoute) {
          setActiveNavLink("Pets");
        } else if (isInDashboardRoute) {
          setActiveNavLink("Dashboard");
        } else if (isInAboutRoute) {
          setActiveNavLink("About");
        } else if (isInMyPostRoute) {
          setActiveNavLink("MyPost");
        } else if (isInMyAdoptionsRoute) {
          setActiveNavLink("MyAdoptions");
        } else if (isInFavoritesRoute) {
          setActiveNavLink("Favorites");
        } else {
          setActiveNavLink("Home");
        }
      }, [location]);

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