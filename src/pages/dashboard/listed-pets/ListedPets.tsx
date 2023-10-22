import { useState } from "react";
import { useFetchPets } from "../../../api/pets/pets";
import LoadingSpinner from "../../../global/LoadingSpinner";
import AddEditPetFormModal from "../../../global/AddEditPetFormModal";
import PetDisplay from "./PetDisplay";

type DataForUpdate = {
  openEditModal: boolean;
  selectedId: null | string;
};

const ListedPets = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: petsData, isLoading } = useFetchPets();
  const [dataForUpdate, setDataForUpdate] = useState<DataForUpdate>({
    openEditModal: false,
    selectedId: null,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseAddPetModal = () => {
    setOpenModal(false);
  };
  const handleCloseEditPetModal = () => {
    setDataForUpdate({
      openEditModal: false,
      selectedId: null,
    });
  };

  const handleOpenEditModal = (petId: string) => {
    setDataForUpdate({
      openEditModal: true,
      selectedId: petId,
    });
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
            petsData.map((pet) => (
              <PetDisplay handleOpenEditModal={handleOpenEditModal} {...pet} />
            ))}
        </div>
      )}
      {isLoading && <LoadingSpinner title="Loading..." size="large" />}
      {!isLoading && petsData.length === 0 && (
        <h1 className="flex justify-center items-center h-96 font-bold text-lg">
          No pet added yet...
        </h1>
      )}
      <AddEditPetFormModal
        dbName="listed-pets"
        selectedId={dataForUpdate.selectedId}
        openEditModal={dataForUpdate.openEditModal}
        openModal={openModal}
        handleCloseAddPetModal={handleCloseAddPetModal}
        handleCloseEditPetModal={handleCloseEditPetModal}
      />
    </div>
  );
};

export default ListedPets;
