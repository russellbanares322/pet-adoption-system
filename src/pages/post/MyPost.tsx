import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchGuestPostedPet } from "../../api/pets/pets";
import { auth } from "../../firebase/firebase-config";
import AddEditPetFormModal from "../../global/AddEditPetFormModal";
import LoadingSpinner from "../../global/LoadingSpinner";
import PetDisplay from "../dashboard/listed-pets/PetDisplay";

type DataForUpdate = {
  openEditModal: boolean;
  selectedId: null | string;
};

const MyPost = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  const { data: petsData, isLoading } = useFetchGuestPostedPet(user?.uid);
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
    <div className="py-24 bg-whitesmoke min-h-screen h-full">
      <div className="container pt-10">
        <div className="flex justify-end items-end mt-3">
          <button onClick={handleOpenModal} className="button-filled">
            Add Post
          </button>
        </div>
        {!isLoading && petsData.length === 0 && (
          <h1 className="text-center text-lg">
            You don't have an active post yet...
          </h1>
        )}
        {!isLoading && (
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {petsData?.map((pet) => (
              <PetDisplay handleOpenEditModal={handleOpenEditModal} {...pet} />
            ))}
          </div>
        )}
        {isLoading && <LoadingSpinner title="Loading..." size="large" />}
        <AddEditPetFormModal
          dbName="pending-pets"
          selectedId={dataForUpdate.selectedId}
          openEditModal={dataForUpdate.openEditModal}
          openModal={openModal}
          handleCloseAddPetModal={handleCloseAddPetModal}
          handleCloseEditPetModal={handleCloseEditPetModal}
        />
      </div>
    </div>
  );
};

export default MyPost;
