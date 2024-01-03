import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {  db } from "../../firebase/firebase-config";
import useUserInfo from "../../hooks/useUserInfo";
import { PetsData } from "../pets/pets";

const useFetchFavoritePosts = () => {
    const [data, setData] = useState<PetsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {email} = useUserInfo()
    const getFavoritePosts = () => {
      setIsLoading(true);
      const userSavedPosts = doc(db, "users", email + "");

      onSnapshot(userSavedPosts, (doc) => {
        setData(doc.data()?.savedFavoritePets)
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getFavoritePosts();
    }, [email]);
  
    return { data, isLoading };
  };

  export { useFetchFavoritePosts }