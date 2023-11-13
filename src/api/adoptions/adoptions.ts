import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase-config";

export type AdoptionsData = {
    id:string,
    userId: string,
    userEmail: string,
    firstName: string,
    middleName: string,
    lastName: string,
    address: string,
    contactNumber: string,
    status: string,
    recipientId:string,
    rejectionReason:string,
    petId: string,
    dateUpdated?:Timestamp,
    dateCreated:Timestamp,
    validIdImg: string
}
const useFetchAdoptionsByUserId = () => {
    const [data, setData] = useState<AdoptionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
  
    const getAdoptionsByUserId = () => {
      if(!user) return;
      setIsLoading(true);
      const adoptionsRef = collection(db, "adoption-applications");
      const q = query(
        adoptionsRef,
        where("userId", "==", user?.uid),
      );
      onSnapshot(q, (snapshot) => {
        const adoptionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AdoptionsData[];
        setData(adoptionsData);
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getAdoptionsByUserId();
    }, []);
  
    return { data, isLoading };
  };

  const useFetchApplicationsByRecipientId = () => {
    const [data, setData] = useState<AdoptionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
  
    const getAdoptionsByRecipientId = () => {
      if(!user) return;
      setIsLoading(true);
      const adoptionsRef = collection(db, "adoption-applications");
      const q = query(
        adoptionsRef,
        where("recipientId", "==", user?.uid),
      );
      onSnapshot(q, (snapshot) => {
        const adoptionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AdoptionsData[];
        setData(adoptionsData);
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getAdoptionsByRecipientId();
    }, []);
  
    return { data, isLoading };
  };

  export {useFetchAdoptionsByUserId, useFetchApplicationsByRecipientId}