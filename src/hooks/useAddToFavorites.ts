import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify";
import { useFetchFavoritePosts } from "../api/favorites/favorites";
import { Comments } from "../api/pets/pets";
import { auth, db } from "../firebase/firebase-config"

type DataToBeAddedToFavorites = {
    id: string,
    petName: string,
    petAge: string,
    petGender: string,
    petColor: string,
    petLocation: string,
    petDescription: string,
    likes: string[],
    comments: Comments[],
    petImage: string,
    createdBy: string,
    dateCreated: Timestamp,
}
const useAddToFavorites = () => {
    const [user] = useAuthState(auth);
    const {data: favoritePostsData} = useFetchFavoritePosts();
    const userDataRef = doc(db, "users", user?.email + "")
    const isLoggedIn = user;

    const isPostAlreadyAdded = (postId: string) => {
        const isPostAlreadyAddedToFav = favoritePostsData?.some((data) => data.id === postId);
        if(isPostAlreadyAddedToFav){
            return true
        }
        return false
    }

    const addPostToFavorites = async(postData: DataToBeAddedToFavorites) => {
        if(!isLoggedIn) return;

        if(isPostAlreadyAdded(postData.id)) {
           return  removePostToFavorites(postData.id)
        } 
        return [await updateDoc(userDataRef, {
            savedFavoritePets: arrayUnion(postData)
        }),
        toast.success("Added to favorites")]
    }

    const removePostToFavorites = async (postId: string) => {
        try {
            const filteredSavedFavoritePets = favoritePostsData?.filter((data) => data.id !== postId);
            await updateDoc(userDataRef, {savedFavoritePets: filteredSavedFavoritePets});
            toast.success("Removed post to favorites")
        } catch(err: any) {
            toast.error(err.message)
        }
    }

  return {addPostToFavorites, isPostAlreadyAdded, removePostToFavorites}
}

export default useAddToFavorites