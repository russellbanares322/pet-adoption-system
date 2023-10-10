import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import AddEditPetFormModal from "./AddEditPetFormModal";
import PetDisplay from "./PetDisplay";

type PetsData = {
  id: string;
  petName: string;
  petAge: string;
  petGender: string;
  petColor: string;
  petDescription: string;
  petImage: string;
};

const ListedPets = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState<PetsData[]>([]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const listedPetsRef = collection(db, "listed-pets");
    onSnapshot(listedPetsRef, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PetsData[];
      setPets(petsData);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-end items-end">
        <button onClick={handleOpenModal} className="button-filled">
          Add New Pet
        </button>
      </div>
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {pets.length > 0 && pets.map((pet) => <PetDisplay {...pet} />)}
      </div>
      <AddEditPetFormModal
        isForUpdate={false}
        openModal={openModal}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default ListedPets;
