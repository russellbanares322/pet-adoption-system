import { Collapse, Modal, Space, Tag } from "antd";
import { AdoptionsData } from "../../api/adoptions/adoptions";

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
  const enableModalScroll = applicationsDataTotalCount > 6;

  const renderCollapseChildrenText = (label: string, value: string) => {
    return (
      <Space>
        {label}: <Tag>{value}</Tag>
      </Space>
    );
  };
  const renderCollapseItemChildren = (data: AdoptionsData) => {
    return (
      <div className="flex flex-col items-center justify-start">
        {renderCollapseChildrenText("First Name", data.firstName)}
        {renderCollapseChildrenText("Middle Name", data.middleName)}
        {renderCollapseChildrenText("Last Name", data.lastName)}
      </div>
    );
  };

  const collapseItems = applicationsData?.map((data, index) => ({
    key: index + 1,
    label: <span className="font-bold">Application #{index + 1}</span>,
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
        }`}
      >
        <Collapse size="middle" items={collapseItems} />
      </div>
    </Modal>
  );
};

export default ApplicationsToBeReviewedModal;
