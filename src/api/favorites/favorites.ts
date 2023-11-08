import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase-config";
import { PetsData } from "../pets/pets";

const useFetchFavoritePosts = () => {
    const [data, setData] = useState<PetsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
  
    const getFavoritePosts = () => {
      setIsLoading(true);
      const userSavedPosts = doc(db, "users", user?.email + "");

      onSnapshot(userSavedPosts, (doc) => {
        setData(doc.data()?.savedFavoritePets)
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getFavoritePosts();
    }, []);
  
    return { data, isLoading };
  };

  export {useFetchFavoritePosts}