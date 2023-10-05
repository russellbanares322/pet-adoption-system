import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthDivider from "../../components/auth-layout/AuthDivider";
import GoogleSignin from "../../components/google-signin/GoogleSignin";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="shadow-md rounded-md bg-white py-5 px-10">
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="text-2xl font-bold">Login Account</p>
        <p className="text-md"> Hello, welcome back</p>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <HiOutlineMail size={25} />
          <input
            onChange={onChange}
            name="email"
            className="appearance-none w-full outline-none"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className="flex items-center gap-3 border-b-2 border-b-gray-800 w-full py-1">
          <MdOutlinePassword size={25} />
          <input
            onChange={onChange}
            name="password"
            className="appearance-none w-full outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <p className="my-5 text-sm text-dark-blue font-semibold cursor-pointer">
        Forgot password?
      </p>
      <button className="button-filled w-full mb-2">Login</button>
      <AuthDivider />
      <GoogleSignin />
      <p className="mt-5 text-sm text-center">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/sign-up")}
          className="text-dark-blue font-semibold cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

export default Login;
