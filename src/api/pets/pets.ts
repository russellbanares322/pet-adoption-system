import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { TStatus } from "../../global/types";

export type Comments = {
  userId: string;
  comment: string;
  commentId: string;
  displayName: string;
  dateCreated: Timestamp;
};

export type PetsData = {
  id: string;
  petName: string;
  petAge: string;
  petType: string;
  petGender: string;
  petColor: string;
  petLocation: string;
  showAdoptButton: boolean;
  petDescription: string;
  petImage: string;
  status?: TStatus;
  createdBy: string;
  dateCreated: Timestamp;
  likes: string[];
  comments: Comments[];
  userId: string;
};

const useFetchPets = () => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "listed-pets");
    const q = query(
      listedPetsRef,
      where("status", "==", "Approved"),
      orderBy("dateCreated", "desc")
    );
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
  }, []);

  return { data, isLoading };
};

const useFetchPet = (id: string) => {
  const [data, setData] = useState<Record<string, any>>({});
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

const useFetchPostedPet = (id: string | undefined) => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "listed-pets");
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

const useFetchPendingPets = () => {
  const [data, setData] = useState<PetsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPets = () => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "listed-pets");
    const q = query(listedPetsRef, where("status", "==", "Pending"));
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
  }, []);

  return { data, isLoading };
};

export { useFetchPets, useFetchPet, useFetchPostedPet, useFetchPendingPets };
