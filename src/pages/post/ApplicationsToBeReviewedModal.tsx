import { Collapse, Image, Modal, Popconfirm, Space, Tag } from "antd";
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
import useApproveAdoptionApplication from "../../hooks/useApproveAdoptionApplication";
import RejectApplicationModal from "../dashboard/adoption/RejectApplicationModal";
import { isAdoptionApplicationRejected } from "../../utils/isAdoptionApplicationRejected";

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
  const { approveApplication } = useApproveAdoptionApplication();
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
    const selectedApplicationsData = {
      ...data,
    };

    const disableButtons = isAdoptionApplicationRejected(data.status);

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
          <Button
            onClick={handleShowImgPreview}
            size="small"
            type="default"
            title="View Sent Valid Id"
            icon={<FileImageOutlined />}
          />
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Popconfirm
            title="Approve Application"
            description="Did you already reviewed the application properly before approving?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => approveApplication(selectedApplicationsData)}
            okButtonProps={{
              className: "primary-btn",
            }}
          >
            <Button
              disabled={disableButtons}
              type="primary"
              size="small"
              styleClass="bg-green"
              title="Approve Application"
              icon={<CheckCircleOutlined />}
            />
          </Popconfirm>
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
    </Modal>
  );
};

export default ApplicationsToBeReviewedModal;
