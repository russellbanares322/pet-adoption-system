import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase-config";
import {NotificationData} from '../notifications/notifications'

export type TUsers = {
  id: string;
  dateCreated: Timestamp;
  email: string;
  savedFavoritePets: string[];
  notifications: NotificationData[];
  isActive: boolean
  isAdmin: boolean
};

const useFetchUsers = () => {
  const [data, setData] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = () => {
    setIsLoading(true);
    const listedUsersRef = collection(db, "users");
    const q = query(listedUsersRef,where("isAdmin", "!=", true))
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

const useFetchUser = (userEmail: string) => {
  const [data, setData] = useState<TUsers | null>(null);
  const [isLoading, setIsLoading] = useState(false);

 const getUser = async() => {
    setIsLoading(true);
    const userDataRef = doc(db, "users", userEmail);
    const snapshot = await getDoc(userDataRef);
    
    if (snapshot.exists()) {
      setData({ ...snapshot.data() as TUsers });
      setIsLoading(false);
    }
 }

  useEffect(() => {
    getUser()
  }, [])

  return { data, isLoading }
}

export { useFetchUsers, useFetchUser };
