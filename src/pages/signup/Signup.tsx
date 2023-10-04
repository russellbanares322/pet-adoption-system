import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthDivider from "../../components/auth-layout/AuthDivider";
import GoogleSignin from "../../components/google-signin/GoogleSignin";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <form className="shadow-md rounded-md bg-white py-5 px-5 md:px-10">
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl md:text-2xl font-bold">Create Account</p>
        <p className="text-sm md:text-md">We are pleased to have you join us</p>
        <p className="text-sm md:text-md">Together, let's save pets' lives.</p>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <HiOutlineUser size={25} />
          <input
            className="appearance-none w-full outline-none"
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <HiOutlineMail size={25} />
          <input
            className="appearance-none w-full outline-none"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <MdOutlinePassword size={25} />
          <input
            className="appearance-none w-full outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <MdOutlinePassword size={25} />
          <input
            className="appearance-none w-full outline-none"
            type="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <p className="my-5 text-sm text-dark-blue font-semibold cursor-pointer">
        Forgot password?
      </p>
      <button className="button-filled w-full mb-2">Sign up</button>
      <AuthDivider />
      <GoogleSignin />
      <p className="mt-5 text-sm text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-dark-blue font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;
