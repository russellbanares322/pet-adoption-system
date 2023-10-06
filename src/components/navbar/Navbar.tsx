import { useState } from "react";
import { HiOutlineX, HiMenu } from "react-icons/hi";
import { FaPaw } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase-config";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const isLoggedIn = user;

  const handleToggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <nav className="w-full shadow-md">
      <div className="container py-6 text-maroon md:flex md:items-center md:justify-start">
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

        {/* Desktop menu items */}
        <ul className="hidden md:flex md:justify-start md:items-center md:w-full text-md gap-5 font-semibold">
          <li onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </li>
          <li className="cursor-pointer">What We Do</li>
          <li className="cursor-pointer">FAQ</li>
          <li className="cursor-pointer">Find Us</li>
          <li
            onClick={() => navigate("/sign-up")}
            className="cursor-pointer ml-auto pr-2"
          >
            {!isLoggedIn && <button className="button-rounded">Sign up</button>}
            {isLoggedIn && `Hi, ${user?.displayName}`}
          </li>
        </ul>

        {/* Mobile menu items */}
        <div
          className={`bg-white left-0 top-0 h-screen fixed flex items-center justify-center z-30 w-full  ${
            openNav ? "translate-y-[-0.1rem]" : "translate-y-[-100vh]"
          } md:hidden duration-300 ease-in-out`}
        >
          <ul className=" flex flex-col justify-center items-center w-full text-sm gap-5 font-semibold">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            <li className="cursor-pointer">What We Do</li>
            <li className="cursor-pointer">FAQ</li>
            <li className="cursor-pointer">Find Us</li>
            <li onClick={() => navigate("/sign-up")} className="cursor-pointer">
              <button className="button-rounded">Sign up</button>
            </li>
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
