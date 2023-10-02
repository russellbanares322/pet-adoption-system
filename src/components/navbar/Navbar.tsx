import { useState } from "react";
import { HiOutlineX, HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleToggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <nav className="page-padding-x py-6 text-black md:flex md:items-center md:justify-start">
      <div className="flex items-center justify-between mr-0 md:mr-6">
        <h1 className="font-bold mr-0 md:mr-5">AdoptAPet</h1>
        <HiMenu
          onClick={handleToggleNavbar}
          className="cursor-pointer md:hidden"
          size={25}
        />
      </div>
      {/* Desktop menu items */}
      <ul className="hidden md:flex md:justify-start md:items-center md:w-full text-md gap-5">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer ml-auto pr-2">
          <button className="button-outlined">Sign up</button>
        </li>
      </ul>
      {/* Mobile menu items */}
      <div
        className={`bg-white left-0 top-0 h-screen fixed flex items-center justify-center z-30 w-full  ${
          openNav ? "translate-y-[-0.1rem]" : "translate-y-[-100vh]"
        } md:hidden duration-300 ease-in-out`}
      >
        <ul className=" flex flex-col justify-center items-center w-full text-md gap-5">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>

          <li className="cursor-pointer">
            <button className="button-outlined">Sign up</button>
          </li>
        </ul>
        <HiOutlineX
          onClick={handleToggleNavbar}
          className="absolute top-6 right-6 text-dark-blue cursor-pointer"
          size={25}
        />
      </div>
    </nav>
  );
};

export default Navbar;
