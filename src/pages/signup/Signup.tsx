import React, { useState } from "react";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import GoogleSignin from "../../components/google-signin/GoogleSignin";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { auth, db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useFetchUsers } from "../../api/users/users";
import AuthDivider from "../../layouts/auth-layout/AuthDivider";

const Signup = () => {
  const navigate = useNavigate();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: registeredUsersData } = useFetchUsers();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordsDontMatch = formData.confirmPassword !== formData.password;
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Check if the gmail is already present in database
  const checkIfEmailIsAlreadyUsed = () => {
    const isEmailAlreadyPresent = registeredUsersData?.some(
      (data) => data?.email === formData.email
    );
    if (isEmailAlreadyPresent) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      passwordsDontMatch
    ) {
      setIsFormDirty(true);
      setIsLoading(false);
    } else {
      if (!checkIfEmailIsAlreadyUsed) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

          setDoc(doc(db, "users", formData.email), {
            dateCreated: serverTimestamp(),
            email: formData.email,
            savedFavoritePets: [],
            notifications: [],
          });

          updateProfile(auth?.currentUser as User, {
            displayName: formData.fullName,
          });

          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
          setIsLoading(false);
          toast.success("Successfully created account");
          window.location.reload();
        } catch (err: any) {
          toast.error(err.message);
          setIsLoading(false);
        }
      } else {
        toast.error("The email you provided is already taken.");
        setIsLoading(false);
      }
    }
  };

  const renderInputWarningMessage = (
    inputName: string,
    displayName: string
  ) => {
    if (!inputName && isFormDirty) {
      return <p className="text-red-600 text-sm">{displayName} is required</p>;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-md rounded-md bg-white py-5 px-5 md:px-10"
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl md:text-2xl font-bold">Create Account</p>
        <p className="text-sm md:text-md">We are pleased to have you join us</p>
        <p className="text-sm md:text-md">Together, let's save pets' lives.</p>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 ${
              isFormDirty && !formData.fullName
                ? "border-b-red-600"
                : "border-b-gray-800"
            }  w-full py-1`}
          >
            <HiOutlineUser size={25} />
            <input
              onChange={onChange}
              name="fullName"
              className="appearance-none w-full outline-none"
              type="text"
              placeholder="Full Name*"
            />
          </div>
          {renderInputWarningMessage(formData.fullName, "Full Name")}
        </div>
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
            />
          </div>
          {renderInputWarningMessage(formData.email, "Email Address")}
        </div>
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 relative ${
              isFormDirty && (!formData.password || passwordsDontMatch)
                ? "border-b-red-600"
                : "border-b-gray-800"
            } w-full py-1`}
          >
            <MdOutlinePassword size={25} />
            <input
              onChange={onChange}
              name="password"
              className="appearance-none w-full outline-none"
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
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 ${
              isFormDirty && (!formData.confirmPassword || passwordsDontMatch)
                ? "border-b-red-600"
                : "border-b-gray-800"
            }  w-full py-1`}
          >
            <MdOutlinePassword size={25} />
            <input
              onChange={onChange}
              name="confirmPassword"
              className="appearance-none w-full outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password*"
            />
          </div>
          {!passwordsDontMatch &&
            renderInputWarningMessage(
              formData.confirmPassword,
              "Confirm Password"
            )}
          {formData.confirmPassword.length > 0 && passwordsDontMatch && (
            <p className="text-red-600 text-sm">Passwords don't match</p>
          )}
        </div>
      </div>
      <p
        onClick={() => navigate("/forgot-password")}
        className="my-5 text-sm text-dark-blue font-semibold cursor-pointer w-max"
      >
        Forgot password?
      </p>
      <button
        disabled={isLoading}
        type="submit"
        className="button-filled w-full mb-2 flex items-center gap-1 justify-center"
      >
        {isLoading ? "Signing up..." : "Sign up"}
        {isLoading && <ClipLoader color="white" size={18} />}
      </button>
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
