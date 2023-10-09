import { useState } from "react";
import AddEditPetFormModal from "./AddEditPetFormModal";

const ListedPets = () => {
  const [openModal, setOpenModal] = useState(false);

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
      <AddEditPetFormModal openModal={openModal} onCancel={handleCloseModal} />
    </div>
  );
};

export default ListedPets;
