import { AdoptionsData } from "../../../api/adoptions/adoptions";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  FileImageOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import Button from "../../../global/Button";
import { Image, Popconfirm, Space, Tag, Tooltip } from "antd";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Comments, useFetchPet } from "../../../api/pets/pets";
import PetDetailsModal from "../../../global/PetDetailsModal";
import moment from "moment";
import useApproveAdoptionApplication from "../../../hooks/useApproveAdoptionApplication";
import RejectApplicationModal from "./RejectApplicationModal";
import { Timestamp } from "firebase/firestore";
import { useReactToPrint } from "react-to-print";
import AdoptionApplicationLayoutModal from "../../../layouts/print-layout/AdoptionApplicationLayoutModal";

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
  status,
  recipientId,
  dateCreated,
  validIdImg,
  rejectionReason,
}: AdoptionsData) => {
  const [openPetDetailsModal, setOpenPetDetailsModal] = useState(false);
  const [showImgPreview, setShowImgPreview] = useState(false);
  const { data: petData, isLoading } = useFetchPet(petId);
  const [rejectApplicationOptions, setRejectApplicationOptions] = useState({
    openModal: false,
    rejectInput: "",
  });
  const elementToBePrintedRef = useRef<HTMLDivElement>(null);
  const printPromiseRef: MutableRefObject<any> =
    useRef<() => void | null>(null);
  const [showElementToBePrinted, setShowElementToBePrinted] = useState(false);
  const { approveApplication } = useApproveAdoptionApplication();

  const applicationData = {
    id,
    userId,
    userEmail,
    firstName,
    middleName,
    lastName,
    address,
    contactNumber,
    petId,
    status,
    recipientId,
    dateCreated,
    validIdImg,
    rejectionReason,
  };

  useEffect(() => {
    if (showElementToBePrinted && printPromiseRef.current) {
      printPromiseRef.current();
    }
  }, [showElementToBePrinted]);

  const hideElementToBePrinted = () => {
    setShowElementToBePrinted(false);
  };

  const onBeforePrint = () => {
    return new Promise((resolve) => {
      printPromiseRef.current = resolve;
      setShowElementToBePrinted(true);
    });
  };

  const onAfterPrint = () => {
    return new Promise((resolve) => {
      printPromiseRef.current = resolve;
      hideElementToBePrinted();
    });
  };

  const printPage = useReactToPrint({
    content: () => elementToBePrintedRef.current,
    onBeforeGetContent: onBeforePrint,
    onAfterPrint: onAfterPrint,
  });

  const handleOpenRejectApplicationModal = () => {
    setRejectApplicationOptions({
      ...rejectApplicationOptions,
      openModal: true,
    });
  };

  const handleCloseRejectApplicationModal = () => {
    setRejectApplicationOptions({
      ...rejectApplicationOptions,
      openModal: false,
    });
  };

  const handleRejectApplicationInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRejectApplicationOptions({
      ...rejectApplicationOptions,
      rejectInput: e.target.value,
    });
  };

  const handleShowImgPreview = () => {
    setShowImgPreview(true);
  };

  const applicationsText = (label: string, value: string) => {
    return (
      <Space>
        {label}:{" "}
        <Tag color={label === "Status" ? getStatusTagColor(value) : ""}>
          {value}
        </Tag>
      </Space>
    );
  };

  const getStatusTagColor = (status: string) => {
    const lowercasedStatus = status.toLowerCase();
    const colorEnum: Record<string, string> = {
      "to be reviewed": "orange",
      rejected: "red",
      approved: "green",
    };

    return colorEnum[lowercasedStatus];
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
      <div className="flex flex-col items-start justify-start gap-2 mt-2">
        {applicationsText("Status", status)}
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
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <Popconfirm
          title="Approve Application"
          description="Did you already reviewed the application properly before approving?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => approveApplication(applicationData)}
          okButtonProps={{
            className: "primary-btn",
          }}
        >
          <Button
            disabled={status === "Approved"}
            type="primary"
            styleClass="bg-green"
            title="Approve"
            icon={<CheckCircleOutlined />}
          />
        </Popconfirm>
        <Button
          onClick={handleOpenRejectApplicationModal}
          disabled={status === "Rejected"}
          type="primary"
          danger={true}
          title="Reject"
          icon={<DeleteOutlined />}
        />
        <Button
          disabled
          onClick={printPage}
          type="primary"
          title="Print"
          ghost
          icon={<PrinterOutlined />}
        />
      </div>
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
        fallback="https://placehold.co/600x400?text=Can't load image properly,\nit might be broken."
      />
      <RejectApplicationModal
        onInputChange={handleRejectApplicationInputChange}
        rejectInputValue={rejectApplicationOptions.rejectInput}
        open={rejectApplicationOptions.openModal}
        onCancel={handleCloseRejectApplicationModal}
        applicationData={applicationData}
      />
      <AdoptionApplicationLayoutModal
        open={showElementToBePrinted}
        onCancel={hideElementToBePrinted}
        data={applicationData}
        elementToBePrintedRef={elementToBePrintedRef}
      />
    </div>
  );
};

export default PendingApplicationsCard;
