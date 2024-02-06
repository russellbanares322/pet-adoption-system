import { Collapse, Image, Modal, Space, Tag } from "antd";
import { AdoptionsData } from "../../api/adoptions/adoptions";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileImageOutlined,
  PrinterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Button from "../../global/Button";
import { useState } from "react";
import moment from "moment";
import RejectApplicationModal from "../dashboard/adoption/RejectApplicationModal";
import AdoptionDateSelector from "../../global/AdoptionApprovalNote";

type ApplicationsToBeReviewedModalProps = {
  openModal: boolean;
  handleCloseApplicationsModal: () => void;
  applicationsData: AdoptionsData[];
  applicationsDataTotalCount: number;
};

type RejectApplicationOptionItems = {
  openModal: boolean;
  rejectInput: string;
  selectedAdoptionsData: AdoptionsData | null;
};

const ApplicationsToBeReviewedModal = ({
  applicationsDataTotalCount,
  applicationsData,
  openModal,
  handleCloseApplicationsModal,
}: ApplicationsToBeReviewedModalProps) => {
  const enableModalScroll = applicationsDataTotalCount > 1;
  const [showImgPreview, setShowImgPreview] = useState(false);
  const [openAdoptionDateSelectorModal, setOpenAdoptionDateSelectorModal] =
    useState(false);
  const [adoptionsData, setAdoptionsData] = useState<AdoptionsData | null>(
    null
  );
  const [rejectApplicationOptions, setRejectApplicationOptions] =
    useState<RejectApplicationOptionItems>({
      openModal: false,
      rejectInput: "",
      selectedAdoptionsData: null,
    });

  const handleOpenRejectApplicationModal = (data: AdoptionsData) => {
    setRejectApplicationOptions({
      ...rejectApplicationOptions,
      openModal: true,
      selectedAdoptionsData: data,
    });
  };

  const handleCloseRejectApplicationModal = () => {
    setRejectApplicationOptions({
      ...rejectApplicationOptions,
      openModal: false,
      selectedAdoptionsData: null,
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

  const getStatusTagColor = (status: string) => {
    const lowercasedStatus = status.toLowerCase();
    if (lowercasedStatus === "to be reviewed") {
      return "orange";
    } else if (lowercasedStatus === "rejected") {
      return "red";
    } else {
      return "green";
    }
  };

  const renderCollapseChildrenText = (label: string, value: string) => {
    return (
      <Space>
        {label}: <Tag color="default">{value}</Tag>
      </Space>
    );
  };

  const renderCollapseItemChildren = (data: AdoptionsData) => {
    const disableButtons =
      data.status === "Rejected" || data.status === "Approved";
    const applicationDatas = {
      ...data,
    };
    return (
      <div>
        <p className="text-center my-1 italic">
          {moment(data.dateCreated?.toDate())?.fromNow()}
        </p>
        <div className="flex flex-col items-start justify-start gap-2">
          {renderCollapseChildrenText("First Name", data?.firstName)}
          {renderCollapseChildrenText("Middle Name", data?.middleName)}
          {renderCollapseChildrenText("Last Name", data?.lastName)}
          {renderCollapseChildrenText("Email", data?.userEmail)}
          {renderCollapseChildrenText("Address", data?.address)}
          {renderCollapseChildrenText("Contact Number", data?.contactNumber)}
          {renderCollapseChildrenText(
            "Reason for Adopting",
            data?.reasonForAdopting
          )}
          {renderCollapseChildrenText(
            "Living Situation",
            data?.livingSituation
          )}
          {renderCollapseChildrenText("Pet Experience", data?.petExperience)}
          {renderCollapseChildrenText(
            "Date of Receiving Pet",
            data?.dateOfReceivingPet
          )}
          {renderCollapseChildrenText(
            "Time of Receiving Pet",
            data?.timeOfReceivingPet
          )}
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
            onClick={() => {
              setAdoptionsData(applicationDatas);
              setOpenAdoptionDateSelectorModal(true);
            }}
            disabled={disableButtons}
            type="primary"
            size="small"
            styleClass="bg-green"
            title="Approve"
            icon={<CheckCircleOutlined />}
          />
          <Button
            disabled={disableButtons}
            onClick={() => handleOpenRejectApplicationModal(data)}
            type="primary"
            size="small"
            danger
            title="Reject Application"
            icon={<CloseCircleOutlined />}
          />
          <Button
            disabled
            type="primary"
            size="small"
            ghost
            title="Print"
            icon={<PrinterOutlined />}
          />
        </div>
        <Image
          width={200}
          style={{ display: "none" }}
          preview={{
            visible: showImgPreview,
            src: data?.validIdImg,
            onVisibleChange: (value) => {
              setShowImgPreview(value);
            },
          }}
        />
      </div>
    );
  };

  const renderCollapseTitle = (applicationStatus: string, index: number) => {
    return (
      <div className="flex items-center justify-between">
        <span className="font-bold">
          Application # {index + 1} -{" "}
          <Tag color={getStatusTagColor(applicationStatus)}>
            {applicationStatus}
          </Tag>
        </span>
        <Button
          size="small"
          disabled
          type="primary"
          danger
          icon={<DeleteOutlined />}
        />
      </div>
    );
  };

  const collapseItems = applicationsData?.map((data, index) => ({
    key: index + 1,
    label: renderCollapseTitle(data.status, index),
    children: renderCollapseItemChildren(data),
  }));
  return (
    <Modal
      title="Applications to be reviewed"
      open={openModal}
      onCancel={handleCloseApplicationsModal}
      footer={null}
    >
      <div
        className={`${
          enableModalScroll
            ? "h-80 overflow-y-scroll"
            : "h-auto overflow-y-hidden"
        } p-2`}
      >
        <Collapse size="middle" items={collapseItems} />
      </div>
      <RejectApplicationModal
        onInputChange={handleRejectApplicationInputChange}
        rejectInputValue={rejectApplicationOptions.rejectInput}
        open={rejectApplicationOptions.openModal}
        onCancel={handleCloseRejectApplicationModal}
        applicationData={
          rejectApplicationOptions.selectedAdoptionsData as AdoptionsData
        }
      />
      <AdoptionDateSelector
        open={openAdoptionDateSelectorModal}
        onCancel={() => setOpenAdoptionDateSelectorModal(false)}
        applicationData={adoptionsData!}
      />
    </Modal>
  );
};

export default ApplicationsToBeReviewedModal;
