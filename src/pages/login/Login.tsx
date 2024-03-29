import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleSignin from "../../components/google-signin/GoogleSignin";
import { auth } from "../../firebase/firebase-config";
import { ClipLoader } from "react-spinners";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthDivider from "../../layouts/auth-layout/AuthDivider";
import useLocalStorage from "../../hooks/useLocalStorage";
import useUserInfo from "../../hooks/useUserInfo";
import Captcha from "../../components/captcha/Captcha";
import { isUserDisabled } from "../../utils/isUserDisabled";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [user] = useAuthState(auth);
  const { isLoggedIn } = useUserInfo();
  const { saveItemInLocalStorage, removeItemFromLocalStorage } =
    useLocalStorage();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onCheckCaptcha = () => {
    setIsCaptchaChecked(true);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email || !formData.password) {
      setIsFormDirty(true);
      setIsLoading(false);
    } else {
      try {
        const signInResponse = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userEmail = signInResponse?.user?.email;
        const userData = {
          displayName: signInResponse?.user?.displayName,
          email: userEmail,
          uid: signInResponse?.user?.uid,
        };
        const disabledUserAccount = await isUserDisabled(userEmail as string);
        if (disabledUserAccount) {
          removeItemFromLocalStorage("user-info");
          await signOut(auth);
          navigate("/login");
          toast.error(
            "Your account has been disabled, please contact administrator regarding this."
          );
          setIsLoading(false);
        } else {
          saveItemInLocalStorage("user-info", userData);
          const isAdmin =
            import.meta.env.VITE_APP_ADMIN_UID === signInResponse?.user?.uid;

          if (isAdmin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
          toast.success("Login Succcessful");
          setFormData({
            email: "",
            password: "",
          });
          setIsLoading(false);
        }
      } catch (err: any) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInputWarningMessage = (
    inputName: string,
    displayName: string
  ) => {
    if (!inputName && isFormDirty) {
      return <p className="text-red-600 text-sm">{displayName} is required</p>;
    }
  };

  useEffect(() => {
    if (user || isLoggedIn) {
      navigate(-1);
    }
  }, [user, isLoggedIn]);

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-md rounded-md bg-white py-5 px-10"
    >
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="text-2xl font-bold">Login Account</p>
        <p className="text-md"> Hello, welcome back</p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 ${
              isFormDirty && !formData.email
                ? "border-b-red-600"
                : "border-b-gray-800"
            }  w-full py-1`}
          >
            <HiOutlineMail size={25} />
            <input
              onChange={onChange}
              name="email"
              className="appearance-none w-full outline-none"
              type="email"
              placeholder="Email Address*"
              autoFocus
            />
          </div>
          {renderInputWarningMessage(formData.email, "Email Address")}
        </div>
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 relative ${
              isFormDirty && !formData.password
                ? "border-b-red-600"
                : "border-b-gray-800"
            }  w-full py-1 `}
          >
            <MdOutlinePassword size={25} />
            <input
              onChange={onChange}
              name="password"
              className="appearance-none w-full outline-none "
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
            />
            {formData.password.length > 0 && !showPassword && (
              <PiEyeClosed
                onClick={togglePasswordVisibility}
                size={23}
                className="absolute top-2 right-3 cursor-pointer"
              />
            )}
            {showPassword && (
              <PiEye
                onClick={togglePasswordVisibility}
                size={23}
                className="absolute top-2 right-3 cursor-pointer"
              />
            )}
          </div>
          {renderInputWarningMessage(formData.password, "Password")}
        </div>
      </div>
      <p
        onClick={() => navigate("/forgot-password")}
        className="my-5 text-sm text-dark-blue font-semibold cursor-pointer w-max"
      >
        Forgot password?
      </p>
      <Captcha
        onCheckCaptcha={onCheckCaptcha}
        onExpired={() => setIsCaptchaChecked(false)}
      />
      <button
        disabled={isLoading || !isCaptchaChecked}
        type="submit"
        className="button-filled w-full mb-2 flex justify-center items-center gap-1"
      >
        {isLoading ? "Logging in..." : "Login"}
        {isLoading && <ClipLoader color="white" size={18} />}
      </button>
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
