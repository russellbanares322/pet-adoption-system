import { useState } from "react";
import { PetsData, useFetchPostedPet } from "../../../api/pets/pets";
import LoadingSpinner from "../../../global/LoadingSpinner";
import AddEditPetFormModal from "../../../global/AddEditPetFormModal";
import PetDisplay from "./PetDisplay";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase-config";
import usePaginate from "../../../hooks/usePaginate";
import { Pagination } from "antd";

type DataForUpdate = {
  openEditModal: boolean;
  selectedId: null | string;
};

const ListedPets = () => {
  const [user] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);
  const { data: petsData, isLoading } = useFetchPostedPet(user?.uid);
  const totalPostedPetCount = petsData?.length;
  const pageData: PetsData[] = petsData;
  const { pageSize, currentItems, onPageChange, totalItemsCount } =
    usePaginate<PetsData>({ pageData });
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
        {!isLoading && (
          <button onClick={handleOpenModal} className="button-filled">
            Add New Pet
          </button>
        )}
      </div>
      {!isLoading && (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {petsData.length > 0 &&
            currentItems.map((pet) => (
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
      {!isLoading && totalPostedPetCount > 0 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination
            defaultCurrent={1}
            onChange={onPageChange}
            size="default"
            total={totalItemsCount}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
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
