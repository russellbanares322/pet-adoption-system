import { useEffect, useState } from "react";
import {
  HiBell,
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
import { Badge } from "antd";
import { useFetchNotifications } from "../../api/notifications/notifications";
import type { MenuProps } from "antd";
import MenuDropdown from "../dropdown/MenuDropdown";
import { useFetchPets } from "../../api/pets/pets";
import moment, { Moment } from "moment";

const Navbar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [activeNavLink, setActiveNavLink] = useState("");
  const { data: notificationsData } = useFetchNotifications();
  const { data: petsData } = useFetchPets();
  const notificationsTotalCount = notificationsData?.length;
  const location = useLocation();
  const isInLoginPage = location.pathname === "/login";
  const isInSignupPage = location.pathname === "/sign-up";
  const isInPetsPage = location.pathname === "/pets";
  const isInDashboardPage = location.pathname.includes("/dashboard");
  const isInAboutPage = location.pathname === "/about-us";
  const isInMyPostPage = location.pathname === "/my-post";
  const isInMyAdoptionsPage = location.pathname === "/my-adoptions";
  const isInFavoritesPage = location.pathname === "/favorites";
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

  const getPetImage = (petId: string) => {
    const petImage = petsData?.find((data) => data.id === petId)?.petImage;
    return petImage;
  };

  const renderNotificationDropdownItemsLabel = (
    petId: string,
    status: string,
    dateUpdated: Moment
  ) => {
    return (
      <div className="flex items-center justify-start gap-3">
        <img
          className="h-10 w-10 object-cover rounded-md"
          src={getPetImage(petId)}
        />
        <div>
          <p className="text-sm">
            Your application for <span className="font-bold">{petId}</span> has
            been <span className="font-bold">{status}</span>
          </p>
          <p className="text-xs text-blue">{moment(dateUpdated).fromNow()}</p>
        </div>
      </div>
    );
  };

  const dropdownItemActions: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      signOut(auth);
      navigate("/");
    }
  };

  const notificationsDropdownItemActions: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      alert("Wow");
    }
  };

  const navDropdownItems: MenuProps["items"] = [
    {
      label: renderNavDropdownItemsLabel("Logout", <HiOutlineLogout />),
      key: "1",
    },
  ];

  const notificationDropdownItems: MenuProps["items"] = notificationsData?.map(
    (data, index) => ({
      label: renderNotificationDropdownItemsLabel(
        data?.petId,
        data?.status,
        data?.dateUpdated
      ),
      key: `${index + 1}`,
    })
  );

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
    } else if (isInMyPostPage) {
      setActiveNavLink("MyPost");
    } else if (isInMyAdoptionsPage) {
      setActiveNavLink("MyAdoptions");
    } else if (isInFavoritesPage) {
      setActiveNavLink("Favorites");
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
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/favorites")}
              className={`cursor-pointer relative ${
                activeNavLink === "Favorites" && "active-nav-link"
              }`}
            >
              Favorites
            </li>
          )}
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/my-post")}
              className={`cursor-pointer relative ${
                activeNavLink === "MyPost" && "active-nav-link"
              }`}
            >
              My Post
            </li>
          )}
          {!isAdminLoggedIn && isLoggedIn && (
            <li
              onClick={() => navigate("/my-adoptions")}
              className={`cursor-pointer relative ${
                activeNavLink === "MyAdoptions" && "active-nav-link"
              }`}
            >
              My Adoptions
            </li>
          )}
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
            <div className="flex items-center justify-start ml-auto gap-2  py-2 pr-2">
              <Badge
                color="#52C41A"
                className="mr-2 cursor-pointer"
                count={
                  notificationsTotalCount === 0 ? null : notificationsTotalCount
                }
              >
                <MenuDropdown
                  items={notificationDropdownItems}
                  itemActions={notificationsDropdownItemActions}
                  trigger="click"
                  isSelectable={true}
                >
                  <HiBell className="cursor-pointer" size={22} />
                </MenuDropdown>
              </Badge>
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
                activeNavLink === "Home" && "mobile-active-nav-link"
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
                activeNavLink === "Pets" && "mobile-active-nav-link"
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
                  activeNavLink === "Favorites" && "mobile-active-nav-link"
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
                  activeNavLink === "MyPost" && "mobile-active-nav-link"
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
                  activeNavLink === "MyAdoptions" && "mobile-active-nav-link"
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
                activeNavLink === "About" && "mobile-active-nav-link"
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
                  activeNavLink === "Dashboard" && "mobile-active-nav-link"
                }`}
              >
                Dashboard
              </li>
            )}
            <li className="flex items-center justify-start gap-2 cursor-pointer">
              Notifications
              <Badge
                color="#52C41A"
                count={
                  notificationsTotalCount === 0 ? null : notificationsTotalCount
                }
              >
                <MenuDropdown
                  items={notificationDropdownItems}
                  itemActions={notificationsDropdownItemActions}
                  trigger="click"
                  isSelectable={true}
                >
                  <HiBell className="cursor-pointer" size={22} />
                </MenuDropdown>
              </Badge>
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
