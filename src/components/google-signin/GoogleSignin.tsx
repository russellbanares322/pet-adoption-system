import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const GoogleSignin = () => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((res: any) => {
        navigate("/");
        setDoc(doc(db, "users", res?.user?.email), {
          savedFavoritePets: [],
        });
        toast.success("Successfully logged in via gmail");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center my-3 w-full">
      <button
        type="button"
        onClick={googleSignIn}
        className="flex justify-center items-center gap-2 google-signin-button"
      >
        <FcGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignin;
