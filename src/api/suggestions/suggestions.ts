import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

export type SuggestionsData = {
    id: string,
    email: string,
    fullName: string,
    message: string
    dateCreated: Timestamp
}

const useFetchSuggestions = () => {
    const [data, setData] = useState<SuggestionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getSuggestions = () => {
      setIsLoading(true);
      const userSuggestionsRef = collection(db, "user-suggestions");
      const q = query(
        userSuggestionsRef,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const suggestionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SuggestionsData[];
        setData(suggestionsData);
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getSuggestions();
    }, []);
  
    return { data, isLoading};
  };

export {useFetchSuggestions}