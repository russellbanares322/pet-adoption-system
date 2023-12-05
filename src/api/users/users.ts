import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase-config";

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

const useFetchUser = () => {
  const [data, setData] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth)

  const getUser = async () => {
    setIsLoading(true);
    const listedUsersRef = collection(db, "users");
    const q = query(listedUsersRef, where("email", "==" , user?.email + ""))
    onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TUsers[];
      setData(usersData);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getUser()
  }, [])

  return { data, isLoading }
}

export { useFetchUsers, useFetchUser };
