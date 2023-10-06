import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthDivider from "../../components/auth-layout/AuthDivider";
import GoogleSignin from "../../components/google-signin/GoogleSignin";
import { auth } from "../../firebase/firebase-config";
import { ClipLoader } from "react-spinners";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) {
      setIsFormDirty(true);
      setIsLoading(false);
    } else {
      try {
        await sendPasswordResetEmail(auth, email, {
          url: "http://localhost:5173/login",
        });
        toast.success(
          `Reset password link is sent to ${email}, please check your email`
        );
        setIsLoading(false);
      } catch (err: any) {
        toast.error(err?.message);
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

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-md rounded-md bg-white py-5 px-10"
    >
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="text-2xl font-bold">Forgot Password</p>
        <p className="text-md">We'll send you a link to reset your password.</p>
      </div>
      <div className="mt-10 flex flex-col mb-3">
        <div>
          <div
            className={`flex items-center gap-3 border-b-2 ${
              isFormDirty && !email ? "border-b-red-600" : "border-b-gray-800"
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
          {renderInputWarningMessage(email, "Email Address")}
        </div>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="button-filled w-full mb-2"
      >
        {isLoading ? "Submitting..." : "Submit"}
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

export default ForgotPassword;
