import { collection, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
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
  }, []);

  return { data, isLoading };
};

export { useFetchPets };
