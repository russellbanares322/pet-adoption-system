import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchPostedPet } from "../../api/pets/pets";
import { auth } from "../../firebase/firebase-config";
import AddEditPetFormModal from "../../global/AddEditPetFormModal";
import Button from "../../global/Button";
import LoadingSpinner from "../../global/LoadingSpinner";
import PetDisplay from "../dashboard/listed-pets/PetDisplay";
import { CopyOutlined } from "@ant-design/icons";
import { useFetchApplicationsByRecipientId } from "../../api/adoptions/adoptions";
import ApplicationsToBeReviewedModal from "./ApplicationsToBeReviewedModal";

type DataForUpdate = {
  openEditModal: boolean;
  selectedId: null | string;
};

const MyPost = () => {
  const [openAddPetModal, setOpenAddPetModal] = useState(false);
  const [openApplicationsModal, setOpenApplicationsModal] = useState(false);
  const [user] = useAuthState(auth);
  const { data: petsData, isLoading: isPostedPetDataPending } =
    useFetchPostedPet(user?.uid);
  const { data: applicationsData } = useFetchApplicationsByRecipientId();
  const applicationsDataTotalCount = applicationsData?.length;
  const isApplicationsDataEmpty = applicationsDataTotalCount === 0;
  const petsDataTotalCount = petsData?.length;
  const isPetsDataEmpty = petsDataTotalCount === 0;
  const [dataForUpdate, setDataForUpdate] = useState<DataForUpdate>({
    openEditModal: false,
    selectedId: null,
  });

  const handleOpenApplicationsModal = () => {
    setOpenApplicationsModal(true);
  };

  const handleCloseApplicationsModal = () => {
    setOpenApplicationsModal(false);
  };
  const handleOpenAddPetModal = () => {
    setOpenAddPetModal(true);
  };

  const handleCloseAddPetModal = () => {
    setOpenAddPetModal(false);
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
        {!isPetsDataEmpty && (
          <h1 className="text-lg text-center">
            Total Post: <span className="font-bold">{petsDataTotalCount}</span>
          </h1>
        )}
        {!isApplicationsDataEmpty && (
          <div className="flex flex-col items-center gap-2 justify-center">
            <h1 className="text-lg text-center">
              Applications to be reviewed: <span className="font-bold">1</span>
            </h1>
            <Button
              onClick={handleOpenApplicationsModal}
              type="primary"
              title="View Applications"
              icon={<CopyOutlined />}
              size="small"
              styleClass="primary-btn"
            />
          </div>
        )}
        {!isPetsDataEmpty && (
          <div className="flex justify-end items-end mt-3">
            <button onClick={handleOpenAddPetModal} className="button-filled">
              Add Post
            </button>
          </div>
        )}
        {!isPostedPetDataPending && isPetsDataEmpty && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-lg">You don't have an active post yet...</h1>
            {isPetsDataEmpty && (
              <button onClick={handleOpenAddPetModal} className="button-filled">
                Add Post
              </button>
            )}
          </div>
        )}
        {!isPostedPetDataPending && (
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {petsData?.map((pet) => (
              <PetDisplay
                key={pet.id}
                handleOpenEditModal={handleOpenEditModal}
                {...pet}
              />
            ))}
          </div>
        )}
        {isPostedPetDataPending && (
          <LoadingSpinner title="Loading..." size="large" />
        )}
        <AddEditPetFormModal
          dbName="listed-pets"
          selectedId={dataForUpdate.selectedId}
          openEditModal={dataForUpdate.openEditModal}
          openModal={openAddPetModal}
          handleCloseAddPetModal={handleCloseAddPetModal}
          handleCloseEditPetModal={handleCloseEditPetModal}
        />
        <ApplicationsToBeReviewedModal
          applicationsDataTotalCount={applicationsDataTotalCount}
          applicationsData={applicationsData}
          openModal={openApplicationsModal}
          handleCloseApplicationsModal={handleCloseApplicationsModal}
        />
      </div>
    </div>
  );
};

export default MyPost;
