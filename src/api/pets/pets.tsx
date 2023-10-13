import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

type PetsData = {
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: string;
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

export { useFetchPets, useFetchPet };
