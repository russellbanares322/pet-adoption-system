import { Collapse, Image, Modal, Space, Tag } from "antd";
import { AdoptionsData } from "../../api/adoptions/adoptions";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import Button from "../../global/Button";
import { useState } from "react";
import moment from "moment";

type ApplicationsToBeReviewedModalProps = {
  openModal: boolean;
  handleCloseApplicationsModal: () => void;
  applicationsData: AdoptionsData[];
  applicationsDataTotalCount: number;
};

const ApplicationsToBeReviewedModal = ({
  applicationsDataTotalCount,
  applicationsData,
  openModal,
  handleCloseApplicationsModal,
}: ApplicationsToBeReviewedModalProps) => {
  const enableModalScroll = applicationsDataTotalCount > 1;
  const [showImgPreview, setShowImgPreview] = useState(false);

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
        {label}:{" "}
        <Tag color={label === "Status" ? getStatusTagColor(value) : ""}>
          {value}
        </Tag>
      </Space>
    );
  };

  const renderCollapseItemChildren = (data: AdoptionsData) => {
    return (
      <div>
        <p className="text-center my-1 italic">
          {moment(data.dateCreated?.toDate())?.fromNow()}
        </p>
        <div className="flex flex-col items-start justify-start gap-2">
          {renderCollapseChildrenText("Status", data?.status)}
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
          <Button
            type="primary"
            size="small"
            styleClass="bg-green"
            title="Approve Application"
            icon={<CheckCircleOutlined />}
          />
          <Button
            type="primary"
            size="small"
            danger={true}
            title="Reject Application"
            icon={<DeleteOutlined />}
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

  const collapseItems = applicationsData?.map((data, index) => ({
    key: index + 1,
    label: <span className="font-bold">Application # {index + 1}</span>,
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
    </Modal>
  );
};

export default ApplicationsToBeReviewedModal;
