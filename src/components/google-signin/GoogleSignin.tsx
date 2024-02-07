import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useFetchUsers } from "../../api/users/users";
import { isUserDisabled } from "../../utils/isUserDisabled";
import useLocalStorage from "../../hooks/useLocalStorage";

const GoogleSignin = () => {
  const navigate = useNavigate();
  const { data: registeredUsersData } = useFetchUsers();
  const { removeItemFromLocalStorage } = useLocalStorage();

  //Check if the gmail is already present in database
  const checkIfGmailIsAlreadyUsed = (providedGmail: string) => {
    const isGmailAlreadyPresent = registeredUsersData?.some(
      (data) => data?.email === providedGmail
    );
    if (isGmailAlreadyPresent) {
      return true;
    }
    return false;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (res: any) => {
        const userEmail = res?.user?.email;
        const disabledUserAccount = await isUserDisabled(userEmail);
        if (disabledUserAccount) {
          removeItemFromLocalStorage("user-info");
          await signOut(auth);
          navigate("/login");
          toast.error(
            "Your account has been disabled, please contact administrator regarding this."
          );
        } else {
          if (!checkIfGmailIsAlreadyUsed(userEmail)) {
            setDoc(doc(db, "users", userEmail), {
              dateCreated: serverTimestamp(),
              email: userEmail,
              savedFavoritePets: [],
              notifications: [],
              isActive: true,
              isAdmin: false,
            });
            navigate("/");
            toast.success("Successfully logged in via gmail");
          }
        }
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
