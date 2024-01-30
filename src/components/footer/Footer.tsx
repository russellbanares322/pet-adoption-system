import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isInLoginRoute = location.pathname === "/login";
  const isInSignupRoute = location.pathname === "/sign-up";
  const isInForgotPasswordRoute = location.pathname === "/forgot-password";
  const isInDasboardRoutes = location.pathname.includes("dashboard");
  const hideFooter =
    isInLoginRoute ||
    isInSignupRoute ||
    isInForgotPasswordRoute ||
    isInDasboardRoutes;

  if (!hideFooter) {
    return (
      <footer className="text-center bg-black py-3 text-white">
        &copy; {new Date().getFullYear()} &#x2022; Adopt A Pet &#x2022; All
        rights reserved
      </footer>
    );
  }
};

export default Footer;
