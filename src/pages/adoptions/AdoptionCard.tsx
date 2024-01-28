import { Tag, Tooltip } from "antd";
import Button from "../../global/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Comments, useFetchPet } from "../../api/pets/pets";
import PetDetailsModal from "../../global/PetDetailsModal";
import AdoptPetFormModal from "../pets/AdoptPetFormModal";
import { Timestamp } from "firebase/firestore";

type AdoptionCardProps = {
  id: string;
  recipientId: string;
  petId: string;
  status: string;
};

const AdoptionCard = ({
  id,
  recipientId,
  petId,
  status,
}: AdoptionCardProps) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openEditAdoptionModal, setOpenEditAdoptionModal] = useState(false);
  const { data: petData, isLoading } = useFetchPet(petId);
  const disableCardButtons = status === "Rejected" || status === "Approved";

  const getTagColor = () => {
    const upperCasedStatus = status.toUpperCase();
    if (upperCasedStatus === "TO BE REVIEWED") {
      return "orange";
    }
    if (upperCasedStatus === "REJECTED") {
      return "red";
    }
    return "green";
  };

  const handleOpenEditAdoptionModal = () => {
    setOpenEditAdoptionModal(true);
    setSelectedId(id);
  };

  const handleCloseEditAdoptionModal = () => {
    setOpenEditAdoptionModal(false);
    setSelectedId("");
  };

  const handleOpenDetailsModal = () => {
    if (!isLoading) {
      setOpenPetDetailsModal(true);
    }
  };

  const handleCloseDetailsModal = () => {
    setOpenPetDetailsModal(false);
  };

  return (
    <div className="shadow-md rounded-md p-2 border bg-white">
      <h1 className="text-center flex flex-col items-center">
        Application for post:{" "}
        <Tooltip title="View Post Details" placement="right">
          <span
            onClick={handleOpenDetailsModal}
            className="font-bold underline cursor-pointer hover:text-blue"
          >
            {petId}
          </span>
        </Tooltip>
      </h1>
      <hr className="my-2" />
      <p className="mt-5 text-center">
        Status: <Tag color={getTagColor()}>{status.toUpperCase()}</Tag>
      </p>
      <div className="flex items-center justify-center mt-5 mb-2 gap-2">
        <Button
          disabled={disableCardButtons}
          onClick={handleOpenEditAdoptionModal}
          size="small"
          type="primary"
          title="Update"
          icon={<EditOutlined />}
          styleClass="primary-btn"
        />
        <Button
          disabled={disableCardButtons}
          size="small"
          type="primary"
          danger={true}
          title="Delete"
          icon={<DeleteOutlined />}
        />
      </div>
      {/* Needs to be refactored */}
      <PetDetailsModal
        open={openPetDetailsModal}
        onCancel={handleCloseDetailsModal}
        id={petId}
        petName={petData?.petName as string}
        petAge={petData?.petAge as string}
        petGender={petData?.petGender as string}
        petColor={petData?.petColor as string}
        petLocation={petData?.petLocation as string}
        petDescription={petData?.petDescription as string}
        likes={petData?.likes as string[]}
        comments={petData?.comments as Comments[]}
        petImage={petData?.petImage as string}
        createdBy={petData?.createdBy as string}
        dateCreated={petData?.dateCreated as Timestamp}
      />
      <AdoptPetFormModal
        openModal={openEditAdoptionModal}
        onCancel={handleCloseEditAdoptionModal}
        selectedId={selectedId}
        recipientId={recipientId}
        isDataForUpdate={true}
      />
    </div>
  );
};

export default AdoptionCard;
