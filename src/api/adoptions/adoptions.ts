import { collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import useUserInfo from "../../hooks/useUserInfo";

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
    const {uid, isLoggedIn} = useUserInfo()  
    const getAdoptionsByUserId = () => {
      if(!isLoggedIn) return;
      setIsLoading(true);
      const adoptionsRef = collection(db, "adoption-applications");
      const q = query(
        adoptionsRef,
        where("userId", "==", uid),
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
    }, [uid]);
  
    return { data, isLoading };
  };

  const useFetchApplicationsByRecipientId = () => {
    const [data, setData] = useState<AdoptionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {uid, isLoggedIn} = useUserInfo();
  
    const getAdoptionsByRecipientId = () => {
      if(!isLoggedIn) return;
      setIsLoading(true);
      const adoptionsRef = collection(db, "adoption-applications");
      const q = query(
        adoptionsRef,
        where("recipientId", "==", uid),
        orderBy("dateCreated", "desc")
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
    }, [uid]);
  
    return { data, isLoading };
  };

  const useFetchAdoptionApplication = (id: string) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
  
    const getSingleAdoptionApplication = async () => {
      if (id !== null) {
        setIsLoading(true);
        const adoptionsRef = doc(db, "adoption-applications", id);
        const snapshot = await getDoc(adoptionsRef);
        if (snapshot.exists()) {
          setData({ ...snapshot.data() });
          setIsLoading(false);
        }
      }
    };
  
    useEffect(() => {
      getSingleAdoptionApplication();
    }, [id]);
  
    return { data, isLoading };
  };

  const useFetchAdoptionsCount =  (petId: string) =>  {
    const [adoptionCount, setAdoptionCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getAdoptions = () => {
      setIsLoading(true);
      const listedPetsRef = collection(db, "adoption-applications");
      const q = query(listedPetsRef, where("petId", "==", petId))
      onSnapshot(q, (snapshot) => {
        const petsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AdoptionsData[];
        setAdoptionCount(petsData?.length);
        setIsLoading(false);
      });
    };
  
    useEffect(() => {
      getAdoptions();
    }, [petId]);
  
    return { adoptionCount, isLoading };
  }

  export {useFetchAdoptionsByUserId, useFetchApplicationsByRecipientId, useFetchAdoptionApplication, useFetchAdoptionsCount}