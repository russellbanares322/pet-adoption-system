import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase-config";

const useLikePost = () => {
    const [user] = useAuthState(auth);
    const loggedInUserId = user?.uid;

    const likePost = (id: string, likes: string[]) => {
        const likesRef = doc(db, "listed-pets", id);
        if(!loggedInUserId) return;
        
        if(likes?.includes(loggedInUserId as string)){
           return updateDoc(likesRef, {
                likes: arrayRemove(loggedInUserId)
            })
        }

        return updateDoc(likesRef, {
            likes: arrayUnion(loggedInUserId)
        })

    }
  return {likePost}
}

export default useLikePost