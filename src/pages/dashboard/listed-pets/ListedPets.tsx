import { useState } from "react";
import LoadingSpinner from "../../../global/LoadingSpinner";
import useFetchPets from "../../../hooks/useFetchPets";
import AddEditPetFormModal from "./AddEditPetFormModal";
import PetDisplay from "./PetDisplay";

const ListedPets = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: petsData, isLoading } = useFetchPets();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-end items-end">
        <button onClick={handleOpenModal} className="button-filled">
          Add New Pet
        </button>
      </div>
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {petsData.length > 0 &&
            petsData.map((pet) => <PetDisplay {...pet} />)}
        </div>
      )}
      {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      {petsData.length === 0 && (
        <h1 className="text-center text-lg font-bold">No pet added yet...</h1>
      )}
      <AddEditPetFormModal
        isForUpdate={false}
        openModal={openModal}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default ListedPets;
