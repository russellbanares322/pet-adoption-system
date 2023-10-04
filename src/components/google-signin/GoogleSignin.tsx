import { FcGoogle } from "react-icons/fc";

const GoogleSignin = () => {
  return (
    <div className="flex justify-center items-center my-3 w-full">
      <button className="flex justify-center items-center gap-2 google-signin-button">
        <FcGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignin;
