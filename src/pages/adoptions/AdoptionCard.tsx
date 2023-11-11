import { Tag, Tooltip } from "antd";
import Button from "../../global/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFetchPet } from "../../api/pets/pets";
import PetDetailsModal from "../../global/PetDetailsModal";

type AdoptionCardProps = {
  petId: string;
  status: string;
};

const AdoptionCard = ({ petId, status }: AdoptionCardProps) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const { data: petData, isLoading } = useFetchPet(petId);

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
          size="small"
          type="primary"
          title="Update"
          icon={<EditOutlined />}
          styleClass="primary-btn"
        />
        <Button
          size="small"
          type="primary"
          danger={true}
          title="Delete"
          icon={<DeleteOutlined />}
        />
      </div>
      <PetDetailsModal
        open={openPetDetailsModal}
        onCancel={handleCloseDetailsModal}
        id={petId}
        petName={petData?.petName}
        petAge={petData?.petAge}
        petGender={petData?.petGender}
        petColor={petData?.petColor}
        petLocation={petData?.petLocation}
        petDescription={petData?.petDescription}
        likes={petData?.likes}
        comments={petData?.comments}
        petImage={petData?.petImage}
        createdBy={petData?.createdBy}
        dateCreated={petData?.dateCreated}
      />
    </div>
  );
};

export default AdoptionCard;
