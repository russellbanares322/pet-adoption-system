import React, { useState } from "react";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthDivider from "../../components/auth-layout/AuthDivider";
import GoogleSignin from "../../components/google-signin/GoogleSignin";
import { updateProfile, User } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordsDontMatch = formData.confirmPassword !== formData.password;
  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      passwordsDontMatch
    ) {
      setIsFormDirty(true);
    }

    try {
      await createUserWithEmailAndPassword(formData.email, formData.password);
      setDoc(doc(db, "users", formData.email), {
        savedFavoritePets: [],
      });
      updateProfile(auth?.currentUser as User, {
        displayName: formData.fullName,
      });
      navigate("/");
    } catch (err) {}
  };

  const renderInputWarningMessage = (
    inputName: string,
    displayName: string
  ) => {
    if (!inputName && isFormDirty) {
      return <p className="text-red-600">{displayName} is required</p>;
    }
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
      <div className="mt-10 flex flex-col gap-6">
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
            placeholder="Full Name"
          />
        </div>
        {renderInputWarningMessage(formData.fullName, "Full Name")}
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
            placeholder="Email Address"
          />
        </div>
        {renderInputWarningMessage(formData.email, "Email Address")}
        <div
          className={`flex items-center gap-3 border-b-2 ${
            isFormDirty && (!formData.password || passwordsDontMatch)
              ? "border-b-red-600"
              : "border-b-gray-800"
          }  w-full py-1`}
        >
          <MdOutlinePassword size={25} />
          <input
            onChange={onChange}
            name="password"
            className="appearance-none w-full outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        {renderInputWarningMessage(formData.password, "Password")}
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
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <p className="my-5 text-sm text-dark-blue font-semibold cursor-pointer">
        Forgot password?
      </p>
      <button type="submit" className="button-filled w-full mb-2">
        {loading ? "Signing up..." : "Sign up"}
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
