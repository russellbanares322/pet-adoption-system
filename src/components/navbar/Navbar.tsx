import { useEffect, useState } from "react";
import {
  HiOutlineX,
  HiMenu,
  HiOutlineChevronDown,
  HiOutlineLogout,
} from "react-icons/hi";
import { FaPaw } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import Dropdown from "../dropdown/Dropdown";
import getLoggedUserInfo from "../../utils/getLoggedUserInfo";

const Navbar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeNavLink, setActiveNavLink] = useState("");
  const location = useLocation();
  const isInLoginPage = location.pathname === "/login";
  const isInSignupPage = location.pathname === "/sign-up";
  const isInPetsPage = location.pathname === "/pets";
  const isInDashboardPage = location.pathname.includes("/dashboard");
  const isInAboutPage = location.pathname === "/about-us";
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const isLoggedIn = user;
  const displayName = getLoggedUserInfo()?.displayName || user?.displayName;
  const isAdminLoggedIn =
    (getLoggedUserInfo()?.email || user?.email) ===
    import.meta.env.VITE_APP_ADMIN_ACCOUNT;

  const handleToggleNavbar = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
    localStorage.removeItem("user-info");
  };

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  const dropdownItems = [
    {
      name: "Logout",
      action: handleLogout,
      icon: <HiOutlineLogout />,
    },
  ];

  useEffect(() => {
    if (isInLoginPage) {
      setActiveNavLink("Login");
    } else if (isInSignupPage) {
      setActiveNavLink("Signup");
    } else if (isInPetsPage) {
      setActiveNavLink("Pets");
    } else if (isInDashboardPage) {
      setActiveNavLink("Dashboard");
    } else if (isInAboutPage) {
      setActiveNavLink("About");
    } else {
      setActiveNavLink("Home");
    }
  }, [location]);

  return (
    <nav className="w-screen shadow-md">
      <div className="container py-4 text-maroon md:flex md:items-center md:justify-start">
        <div className="flex items-center justify-between mr-0 md:mr-6 text-xl">
          <h1
            onClick={() => navigate("/")}
            className="font-bold justify-center flex items-center gap-2 mr-0 md:mr-5 cursor-pointer"
          >
            AdoptAPet <FaPaw />
          </h1>
          <HiMenu
            onClick={handleToggleNavbar}
            className="cursor-pointer md:hidden"
            size={25}
          />
        </div>

        {/* Desktop navbar */}
        <ul className="hidden md:flex md:justify-start md:items-center md:w-full text-md gap-5 font-semibold">
          <li
            onClick={() => navigate("/")}
            className={`cursor-pointer relative ${
              activeNavLink === "Home" && "active-nav-link"
            }`}
          >
            Home
          </li>
          <li
            onClick={() => navigate("/pets")}
            className={`cursor-pointer relative ${
              activeNavLink === "Pets" && "active-nav-link"
            }`}
          >
            Pets
          </li>
          <li
            onClick={() => navigate("/about-us")}
            className={`cursor-pointer relative ${
              activeNavLink === "About" && "active-nav-link"
            }`}
          >
            What We Do
          </li>
          {isAdminLoggedIn && (
            <li
              onClick={() => navigate("/dashboard")}
              className={`cursor-pointer relative ${
                activeNavLink === "Dashboard" && "active-nav-link"
              }`}
            >
              Dashboard
            </li>
          )}
          {!isLoggedIn && (
            <li
              onClick={() => navigate("/login")}
              className="cursor-pointer ml-auto"
            >
              <button className="button-filled">Login</button>
            </li>
          )}
          {isLoggedIn && (
            <li className="ml-auto pr-2 flex items-center gap-2 relative py-2">
              Hi, {displayName}
              <HiOutlineChevronDown
                onClick={handleToggleDropdown}
                className="cursor-pointer"
                size={23}
              />
              <Dropdown
                onClose={handleCloseDropdown}
                dropdownItems={dropdownItems}
                open={openDropdown}
              />
            </li>
          )}
        </ul>

        {/* Mobile navbar */}
        {openNav && (
          <div className="md:hidden bg-black/80 fixed w-full left-0 h-screen top-0 z-10" />
        )}
        <div
          className={`bg-white right-0 top-0 h-screen fixed flex items-center justify-center z-30 w-[16rem]  ${
            openNav ? "-translate-x-[-0.1rem]" : "-translate-x-[-100vh]"
          } md:hidden duration-300 ease-in-out`}
        >
          <ul className="flex flex-col justify-start items-start w-full text-md gap-5 font-semibold px-5">
            <li
              onClick={() => navigate("/")}
              className={`cursor-pointer relative ${
                activeNavLink === "Home" && "mobile-active-nav-link"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/pets")}
              className={`cursor-pointer relative ${
                activeNavLink === "Pets" && "mobile-active-nav-link"
              }`}
            >
              Pets
            </li>
            <li
              onClick={() => navigate("/about-us")}
              className={`cursor-pointer relative ${
                activeNavLink === "About" && "mobile-active-nav-link"
              }`}
            >
              What We Do
            </li>
            {isAdminLoggedIn && (
              <li
                onClick={() => navigate("/dashboard")}
                className={`cursor-pointer relative ${
                  activeNavLink === "Dashboard" && "mobile-active-nav-link"
                }`}
              >
                Dashboard
              </li>
            )}
            {!isLoggedIn && (
              <li onClick={() => navigate("/login")} className="cursor-pointer">
                <button className="button-filled">Login</button>
              </li>
            )}
            {isLoggedIn && (
              <li className="flex items-center gap-2 relative py-2">
                Hi, {displayName}
                <HiOutlineChevronDown
                  onClick={handleToggleDropdown}
                  className="cursor-pointer"
                  size={23}
                />
                <Dropdown
                  onClose={handleCloseDropdown}
                  dropdownItems={dropdownItems}
                  open={openDropdown}
                />
              </li>
            )}
          </ul>
          <HiOutlineX
            onClick={handleToggleNavbar}
            className="absolute top-8 right-5 text-dark-blue cursor-pointer"
            size={25}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
