import { useState } from "react";
import {
  HiOutlineX,
  HiMenu,
  HiOutlineChevronDown,
  HiOutlineLogout,
} from "react-icons/hi";
import { FaPaw } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import type { MenuProps } from "antd";
import MenuDropdown from "../dropdown/MenuDropdown";
import useActiveNavLink from "../../hooks/useActiveNavLink";
import NotificationDropdownItems from "../notification/NotificationDropdownItems";

const Navbar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { checkIfNavLinkActive } = useActiveNavLink();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const isLoggedIn = user;
  const displayName = user?.displayName;
  const isAdminLoggedIn =
    user?.email === import.meta.env.VITE_APP_ADMIN_ACCOUNT;

  const handleToggleNavbar = () => {
    setOpenNav(!openNav);
  };

  const handleCloseNavbar = () => {
    setOpenNav(false);
  };

  const renderNavDropdownItemsLabel = (
    title: string,
    icon: React.ReactElement
  ) => {
    return (
      <p className="flex items-center justify-start gap-2">
        {icon}
        {title}
      </p>
    );
  };

  const dropdownItemActions: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      signOut(auth);
      navigate("/");
    }
  };

  const navDropdownItems: MenuProps["items"] = [
    {
      label: renderNavDropdownItemsLabel("Logout", <HiOutlineLogout />),
      key: "logout",
    },
  ];

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
              checkIfNavLinkActive("Home") && "active-nav-link"
            }`}
          >
            Home
          </li>
          <li
            onClick={() => navigate("/pets")}
            className={`cursor-pointer relative ${
              checkIfNavLinkActive("Pets") && "active-nav-link"
            }`}
          >
            Pets
          </li>
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/favorites")}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("Favorites") && "active-nav-link"
              }`}
            >
              Favorites
            </li>
          )}
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/my-post")}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("MyPost") && "active-nav-link"
              }`}
            >
              My Post
            </li>
          )}
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/my-adoptions")}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("MyAdoptions") && "active-nav-link"
              }`}
            >
              My Adoptions
            </li>
          )}
          <li
            onClick={() => navigate("/about-us")}
            className={`cursor-pointer relative ${
              checkIfNavLinkActive("About") && "active-nav-link"
            }`}
          >
            What We Do
          </li>

          {isAdminLoggedIn && (
            <li
              onClick={() => navigate("/dashboard")}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("Dashboard") && "active-nav-link"
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
            <div className="flex items-center justify-start ml-auto gap-2  py-2 pr-2">
              <NotificationDropdownItems />
              <li className="flex items-center gap-2 relative">
                Hi, {displayName}
                <MenuDropdown
                  items={navDropdownItems}
                  itemActions={dropdownItemActions}
                  trigger="click"
                >
                  <HiOutlineChevronDown className="cursor-pointer" size={23} />
                </MenuDropdown>
              </li>
            </div>
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
              onClick={() => {
                navigate("/");
                handleCloseNavbar();
              }}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("Home") && "mobile-active-nav-link"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/pets");
                handleCloseNavbar();
              }}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("Pets") && "mobile-active-nav-link"
              }`}
            >
              Pets
            </li>
            {!isAdminLoggedIn && isLoggedIn && (
              <li
                onClick={() => {
                  navigate("/favorites");
                  handleCloseNavbar();
                }}
                className={`cursor-pointer relative ${
                  checkIfNavLinkActive("Favorites") && "mobile-active-nav-link"
                }`}
              >
                Favorites
              </li>
            )}
            {!isAdminLoggedIn && isLoggedIn && (
              <li
                onClick={() => {
                  navigate("/my-post");
                  handleCloseNavbar();
                }}
                className={`cursor-pointer relative ${
                  checkIfNavLinkActive("MyPost") && "mobile-active-nav-link"
                }`}
              >
                My Post
              </li>
            )}
            {!isAdminLoggedIn && isLoggedIn && (
              <li
                onClick={() => {
                  navigate("/my-adoptions");
                  handleCloseNavbar();
                }}
                className={`cursor-pointer relative ${
                  checkIfNavLinkActive("MyAdoptions") &&
                  "mobile-active-nav-link"
                }`}
              >
                My Adoptions
              </li>
            )}
            <li
              onClick={() => {
                navigate("/about-us");
                handleCloseNavbar();
              }}
              className={`cursor-pointer relative ${
                checkIfNavLinkActive("About") && "mobile-active-nav-link"
              }`}
            >
              What We Do
            </li>
            {isAdminLoggedIn && (
              <li
                onClick={() => {
                  navigate("/dashboard");
                  handleCloseNavbar();
                }}
                className={`cursor-pointer relative ${
                  checkIfNavLinkActive("Dashboard") && "mobile-active-nav-link"
                }`}
              >
                Dashboard
              </li>
            )}
            <li className="flex items-center justify-start gap-2 cursor-pointer">
              {isLoggedIn && <NotificationDropdownItems />}
            </li>
            {!isLoggedIn && (
              <li
                onClick={() => {
                  navigate("/login");
                  handleCloseNavbar();
                }}
                className="cursor-pointer"
              >
                <button className="button-filled">Login</button>
              </li>
            )}
            {isLoggedIn && (
              <li className="flex items-center gap-2 relative py-2">
                Hi, {displayName}
                <MenuDropdown
                  items={navDropdownItems}
                  itemActions={dropdownItemActions}
                  trigger="click"
                >
                  <HiOutlineChevronDown className="cursor-pointer" size={23} />
                </MenuDropdown>
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
