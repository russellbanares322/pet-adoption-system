import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

type TUsers = {
  id: string;
  dateCreated: Timestamp;
  email: string;
  savedFavoritePets: string[];
  notifications: [];
};

const useFetchUsers = () => {
  const [data, setData] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    setIsLoading(true);
    const listedUsersRef = collection(db, "users");
    const q = query(listedUsersRef,orderBy("dateCreated", "desc"))
    onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TUsers[];
      setData(usersData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { data, isLoading };
};

export { useFetchUsers };
