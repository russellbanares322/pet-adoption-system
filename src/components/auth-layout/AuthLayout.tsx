import { useLocation } from "react-router-dom";
import Signup from "../../pages/signup/Signup";
import authImg from "../../assets/auth.svg";
import Login from "../../pages/login/Login";

const AuthLayout = () => {
  const location = useLocation();
  const isInLoginPage = location.pathname === "/login";
  const isInSignupPage = location.pathname === "/sign-up";

  return (
    <div className="w-full py-14 h-full min-h-[100vh] bg-whitesmoke">
      <div className="container grid grid-cols lg:grid-cols-2 gap-10 md:gap-44">
        <img className="hidden lg:block pt-40" src={authImg} />
        <div className="my-10 md:my-14">
          {isInSignupPage && <Signup />}
          {isInLoginPage && <Login />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
