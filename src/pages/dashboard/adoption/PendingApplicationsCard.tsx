import { AdoptionsData } from "../../../api/adoptions/adoptions";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import Button from "../../../global/Button";
import { Image, Space, Tag, Tooltip } from "antd";
import { useState } from "react";
import { useFetchPet } from "../../../api/pets/pets";
import PetDetailsModal from "../../../global/PetDetailsModal";
import moment from "moment";

const PendingApplicationsCard = ({
  id,
  userId,
  userEmail,
  firstName,
  middleName,
  lastName,
  address,
  contactNumber,
  petId,
  dateCreated,
  validIdImg,
}: AdoptionsData) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const [showImgPreview, setShowImgPreview] = useState(false);
  const { data: petData, isLoading } = useFetchPet(petId);

  const handleShowImgPreview = () => {
    setShowImgPreview(true);
  };

  const applicationsText = (label: string, value: string) => {
    return (
      <Space>
        {label}: <Tag>{value}</Tag>
      </Space>
    );
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
      <h1 className="text-center flex flex-col items-center my-2">
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
      <p className="text-center my-1 italic">
        {moment(dateCreated?.toDate())?.fromNow()}
      </p>
      <div className="flex flex-col items-start justify-start gap-2">
        {applicationsText("First Name", firstName)}
        {applicationsText("Middle Name", middleName)}
        {applicationsText("Last Name", lastName)}
        {applicationsText("Email", userEmail)}
        {applicationsText("Address", address)}
        {applicationsText("Contact Number", contactNumber)}
        <Button
          onClick={handleShowImgPreview}
          size="small"
          type="default"
          title="View Sent Valid Id"
          icon={<FileImageOutlined />}
        />
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          type="primary"
          styleClass="bg-green"
          title="Approve"
          icon={<CheckCircleOutlined />}
        />
        <Button
          type="primary"
          danger={true}
          title="Reject"
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
      <Image
        width={200}
        style={{ display: "none" }}
        preview={{
          visible: showImgPreview,
          src: validIdImg,
          onVisibleChange: (value) => {
            setShowImgPreview(value);
          },
        }}
      />
    </div>
  );
};

export default PendingApplicationsCard;
