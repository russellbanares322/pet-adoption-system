import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

type Comments = {
  comment: string;
  commentId: string;
  user: string;
  displayName: string;
};

export type PetsData = {
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: string;
  status?: string;
  createdBy: string;
  dateCreated: Timestamp;
  likes: string[];
  comments: Comments[];
};

const useFetchPets = () => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "listed-pets");
    onSnapshot(listedPetsRef, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PetsData[];
      setData(petsData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  return { data, isLoading };
};

const useFetchPet = (id: string) => {
  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getSinglePet = async () => {
    if (id !== null) {
      setIsLoading(true);
      const listedPetsRef = doc(db, "listed-pets", id);
      const snapshot = await getDoc(listedPetsRef);
      if (snapshot.exists()) {
        setData({ ...snapshot.data() });
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getSinglePet();
  }, [id]);

  return { data, isLoading };
};

const useFetchGuestPostedPet = (id: string | undefined) => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "pending-pets");
    const q = query(listedPetsRef, where("userId", "==", id));

    onSnapshot(q, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PetsData[];
      setData(petsData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPets();
  }, [id]);

  return { data, isLoading };
};

const useFetchPendingPostedPets = () => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "pending-pets");
    onSnapshot(listedPetsRef, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PetsData[];
      setData(petsData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  return { data, isLoading };
};

export {
  useFetchPets,
  useFetchPet,
  useFetchGuestPostedPet,
  useFetchPendingPostedPets,
};
